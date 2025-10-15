from pymongo import MongoClient
from bson.objectid import ObjectId
from typing import Any, List, Optional

class BlogDB:
    def __init__(self, mongo_uri: str, db_name: str = "lecoinsecu"):
        self.client = MongoClient(mongo_uri)
        self.db = self.client[db_name]
        self.articles = self.db["articles"]

    def get_all_articles(self) -> List[dict[str, Any]]:
        """Return all articles sorted by date descending."""
        return list(self.articles.find().sort("date", -1))

    def get_article_by_id(self, article_id: str) -> Optional[dict[str, Any]]:
        """Return a single article by its ObjectId or None if not found."""
        try:
            return self.articles.find_one({"_id": ObjectId(article_id)})
        except:
            return None

    def insert_article(self, article: dict[str, Any]) -> str:
        """Insert a new article and return its ID."""
        result = self.articles.insert_one(article)
        return str(result.inserted_id)
