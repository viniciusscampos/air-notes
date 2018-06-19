module.exports = 
{
    "properties": {
        "anchor": {
            "type": "string"
        },
        "owner": {
            "type": "string"
        },
        "status": {
            "type": "string"
        },
        "notes": {
            "type": "array",
            "items": {
                "note": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "body": {
                            "type": "string"
                        },
                        "author": {
                            "type": "string"
                        },
                        "position": {
                            "type": "string"
                        },
                        "rotation": {
                            "type": "string"
                        }
                    },
                    "required": ["title", "body", "author"]
                }
            }
        }
    },
    "required": ["anchor", "owner", "status", "notes"]
}