def test_create_brief(client):
    """Test that a Brand can successfully post a new job"""
    
    payload = {
        "product_name": "Need a TikTok Video for Skincare",
        "brief_description": "Looking for a 30s UGC video demonstrating our new moisturizer.",
        "product_url": "https://example.com/skincare",
        "industry": "skincare",
        "budget": 5000
    }
    
    response = client.post("/briefs", json=payload)
    
    assert response.status_code == 201, response.text
    
    data = response.json()
    assert data["product_name"] == payload["product_name"]
    assert data["budget"] == payload["budget"]
    assert "id" in data 
    assert data["brand_id"] == "test_brand_123" 


def test_get_all_briefs(client):
    """Test that the open job board returns a list of jobs"""
    
    # 1. Post a dummy job
    post_response = client.post("/briefs", json={
        "product_name": "Test Brief", 
        "brief_description": "This is a test description that is over twenty characters long.",
        "product_url": "https://example.com", 
        "industry": "tech",
        "budget": 1000
    })
    
    assert post_response.status_code == 201, post_response.text
    
    # 2. Fetch all jobs
    response = client.get("/briefs")
    
    assert response.status_code == 200, response.text
    data = response.json()
    
    assert type(data) == list 
    assert len(data) == 1     
    assert data[0]["product_name"] == "Test Brief"