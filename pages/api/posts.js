import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';

const dbclient = new DynamoDBClient({
  region: process.env.DB_REGION,
  credentials: {
    accessKeyId: process.env.DB_ACCESSKEY_ID,
    secretAccessKey: process.env.DB_SECRETACCESS_KEY,
  },
});

const posts = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const params = {
        TableName: process.env.DB_TABLE_NAME,
        Limit: 10,
        KeyConditionExpression: 'dataType = :post',
        IndexName: 'publishDate-index',
        ExpressionAttributeValues: {
          ':post': { S: 'post' },
        },
        ScanIndexForward: false,
      };
      if (req.query.lastEvaluatedKey) {
        params.ExclusiveStartKey = JSON.parse(req.query.lastEvaluatedKey + '');
      }
      const results = await dbclient.send(new QueryCommand(params));
      res.status(200).json(results);
    }
  } catch (err) {
    console.error(err);
  }
}

export default posts;