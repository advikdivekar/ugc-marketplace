def test_create_brief(client):
    """Test that a Brand can successfully post a new job"""
    
    payload = {
        "title": "Need a TikTok Video for Skincare",
        "description": "Looking for a 30s UGC video demonstrating our new moisturizer.",
        "product_url": "https://example.com/skincare",
        "deadline": "2026-12-31", # <-- Fixed to pure date
        "category": "skincare",   # <-- Fixed to exact lowercase literal
        "budget": 5000
    }
    
    response = client.post("/briefs", json=payload)
    
    assert response.status_code == 201, response.text
    
    data = response.json()
    assert data["title"] == payload["title"]
    assert data["budget"] == payload["budget"]
    assert "id" in data 
    assert data["brand_id"] == "test_brand_123" 


def test_get_all_briefs(client):
    """Test that the open job board returns a list of jobs"""
    
    # 1. Post a dummy job (with perfectly validated data!)
    post_response = client.post("/briefs", json={
        "title": "Test Brief", 
        "description": "This is a test description that is over twenty characters long.", # <-- Made it longer!
        "product_url": "https://example.com", 
        "deadline": "2026-12-31", # <-- Fixed to pure date
        "category": "tech",       # <-- Fixed to lowercase
        "budget": 1000
    })
    
    assert post_response.status_code == 201, post_response.text
    
    # 2. Fetch all jobs
    response = client.get("/briefs")
    
    assert response.status_code == 200, response.text
    data = response.json()
    
    assert type(data) == list 
    assert len(data) == 1     
    assert data[0]["title"] == "Test Brief"