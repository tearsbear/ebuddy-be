## API Reference

use this bearer token : id2024

#### fetch user data

```http
  GET /fetch-user-data?userId={documentId}
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `userId`  | `string` | **Required**. user Document ID in collection |

#### update user data

```http
  PUT /update-user-data
```

Body:

```bash
{
  "userId": "{user documentId}",
  "displayName": "jiehan updated",
  "age": 25,
  "profession": "designer updated"
}

```
