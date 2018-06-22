import boto3
import json
import os
import configparser
from decimal import Decimal

def updateAnchor (event, context):

    try:
        body = event["body"]
        table = os.environ['DYNAMODB_TABLE']
        dynamodb = boto3.resource('dynamodb')

        dynamodb.update_item(TableName=table, 
                                Key={'anchor': body["anchor"]}, 
                                AttributeUpdates={"notes":body["notes"]}}) 
        return {
            statusCode: 200,
            body: json.dumps(body), ensure_ascii=False),
        }

    except e:
        return {
            statusCode: 500,
            body: json.dumps({error:str(e)}, ensure_ascii=False),
        }