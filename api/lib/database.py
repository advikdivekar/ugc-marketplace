import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. Fetch your Neon connection string
DATABASE_URL = os.environ.get("DATABASE_URL")

# SQLAlchemy requires the URL to start with "postgresql://" 
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# 2. Create the Engine (The actual connection pipeline)
# connect_args={"sslmode": "require"} is absolutely mandatory for Neon!
engine = create_engine(
    DATABASE_URL, 
    connect_args={"sslmode": "require"}
)

# 3. Create a Session Factory (Generates temporary connections for each API request)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Create the Base Model (All our database tables will inherit from this)
Base = declarative_base()

# 5. The FastAPI Dependency 
# We will inject this into our routes so they can talk to the database safely
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()