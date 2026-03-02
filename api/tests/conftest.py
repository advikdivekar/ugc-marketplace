import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool # <-- 1. ADD THIS IMPORT

# Import your actual app and dependencies
from main import app
from lib.database import Base, get_db
from dependencies.auth import get_current_user, get_brand_user, get_writer_user

# Move these to the top so they load instantly
from models.user import User
from models.brief import Brief
from models.profile import Profile
from models.submission import Submission
from models.review import Review

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

# 2. ADD THE STATIC POOL HERE
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False},
    poolclass=StaticPool # <-- This forces SQLite to keep the database alive!
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 2. Database Fixture: This builds the tables, runs the test, and deletes the tables
@pytest.fixture(scope="function")
def db_session():
    # FORCE Python to load the blueprints right here
    from models.user import User
    from models.brief import Brief
    from models.profile import Profile
    from models.submission import Submission
    from models.review import Review

    # Now create the tables in the fake database
    Base.metadata.create_all(bind=engine)
    
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        # Destroy the tables after the test finishes
        Base.metadata.drop_all(bind=engine)

# 3. Security Overrides: Fake VIP passes to bypass Clerk during testing
def override_get_current_user():
    return {"user_id": "test_user_123", "role": "writer", "email": "test@test.com"}

def override_get_brand_user():
    return {"user_id": "test_brand_123", "role": "brand", "email": "brand@test.com"}

def override_get_writer_user():
    return {"user_id": "test_writer_123", "role": "writer", "email": "writer@test.com"}

# 4. Client Fixture: This is your "Fake Frontend" that will fire requests at your API
@pytest.fixture(scope="function")
def client(db_session):
    # Swap out the real Neon DB for our fake SQLite DB
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    
    # Swap out the real Clerk auth for our fake VIP passes
    app.dependency_overrides[get_current_user] = override_get_current_user
    app.dependency_overrides[get_brand_user] = override_get_brand_user
    app.dependency_overrides[get_writer_user] = override_get_writer_user

    with TestClient(app) as c:
        yield c
        
    # Clean up the overrides after the test
    app.dependency_overrides.clear()