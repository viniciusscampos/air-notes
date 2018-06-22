import boto3
import json
import os
import configparser
from decimal import Decimal

def updateAnchor (event, context):

    try:
        body = json.loads(event["body"])
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
        result = table.update_item(
            Key={
                'anchor': body["anchor"]
            },
            ExpressionAttributeValues={
                ':notes': body['notes']
            },
            UpdateExpression='SET notes = :notes',
             ReturnValues='ALL_NEW',
        )
        return {
            "statusCode": 200,
            "body": json.dumps(result['Attributes'])
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error":str(e)}, ensure_ascii=False),
        }