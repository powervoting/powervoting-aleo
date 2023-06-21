---
title: Aleo Power-Voting v1.0.0
language_tabs:
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.17"

---

# Aleo Power-Voting

> v1.0.0

Base URLs:

* <a href="http://103.1.65.126:9901">测试环境: http://103.1.65.126:9901</a>

# proposals

## POST 创建投票项目

POST /proposals

创建投票项目

> Body 请求参数

```json
{
  "title": "投票项目测试",
  "proposal_id": 24,
  "description": "aleo power-voting 测试",
  "start_time": 12345,
  "end_time": 12346,
  "status": "Voting",
  "participate": "Created",
  "option": [
    "yes",
    "no"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» title|body|string| 是 | 项目名|none|
|» proposal_id|body|integer| 是 | 项目id|none|
|» description|body|string| 是 | 项目介绍|none|
|» start_time|body|integer| 是 ||none|
|» end_time|body|integer| 是 ||none|
|» status|body|string| 是 | 提案状态|none|
|» option|body|[string]| 是 | 投票参数列表|none|
|» participate|body|string| 是 ||none|

> 返回示例

> 成功

```json
{
  "ok": true,
  "data": {
    "id": 0,
    "proposal_id": 24,
    "title": "投票项目测试",
    "description": "aleo power-voting 测试",
    "status": "Voting",
    "participate": "Created",
    "option": [
      "yes",
      "no"
    ],
    "start_time": 12345,
    "end_time": 12346
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» ok|boolean|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» proposal_id|integer|true|none||none|
|»» title|string|true|none||none|
|»» description|string|true|none||none|
|»» status|string|true|none||none|
|»» participate|string|true|none||none|
|»» option|[string]|true|none||none|
|»» start_time|integer|true|none||none|
|»» end_time|integer|true|none||none|

## PATCH 更新投票项目状态

PATCH /proposals

更新提案 status和participate两个字段，

> Body 请求参数

```json
{
  "update_mask": [
    "status",
    "participate"
  ],
  "status": "aliquip ut ad",
  "participate": "ea culpa cillum proident officia",
  "proposal_id": 21
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» proposal_id|body|integer| 是 | 投票项目id|proposal_id不是数据库生成id，是投票项目的id|
|» status|body|string¦null| 是 | 状态|更新状态的值|
|» participate|body|string¦null| 是 ||更新的值|
|» update_mask|body|[string]| 是 | 更新字段|需要更新的字段|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询投票项目列表

GET /proposals

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|page|query|integer| 是 ||页数|
|pageSize|query|integer| 是 ||一页多少条数据|

> 返回示例

> 200 Response

```json
{
  "ok": true,
  "data": [
    {
      "Id": 0,
      "proposal_id": 0,
      "title": "string",
      "description": "string",
      "status": "string",
      "participate": "string",
      "start_time": 0,
      "end_time": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» ok|boolean|true|none||none|
|» data|[object]|true|none||none|
|»» Id|integer|false|none||none|
|»» proposal_id|integer|false|none||none|
|»» title|string|false|none||none|
|»» description|string|false|none||none|
|»» status|string|false|none||none|
|»» participate|string|false|none||none|
|»» start_time|integer|false|none||none|
|»» end_time|integer|false|none||none|

## GET 查询投票项目信息

GET /proposals/{proposal_id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|proposal_id|path|string| 是 ||none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询投票

GET /involve/{proposal_id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|proposal_id|path|string| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "ok": true,
  "data": {
    "id": 0,
    "proposal_id": 0,
    "participant": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» ok|boolean|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» proposal_id|integer|true|none||none|
|»» participant|string|true|none||none|

## POST 创建投票

POST /involve

> Body 请求参数

```json
{
  "proposal_id": 0,
  "participant": "string",
  "vote": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» proposal_id|body|integer| 是 | 项目id|none|
|» participant|body|string| 是 | 投票参与人|none|
|» vote|body|string| 是 | 投票结果 t-lock的哈希|none|

> 返回示例

> 200 Response

```json
{
  "ok": true,
  "data": {
    "proposal_id": 0,
    "participant": "string",
    "vote": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» ok|boolean|true|none||none|
|» data|object|true|none||none|
|»» proposal_id|integer|true|none||none|
|»» participant|string|true|none||none|
|»» vote|string|true|none||none|

## GET 查询计票结果

GET /record/{proposal_id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|proposal_id|path|integer| 是 ||none|
|participant|query|string| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "ok": true,
  "data": {
    "id": 0,
    "proposal_id": 0,
    "win": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» ok|boolean|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» proposal_id|integer|true|none||none|
|»» win|string|true|none||none|

## POST 创建计票结果

POST /record

> Body 请求参数

```json
{
  "proposal_id": 0,
  "win": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» proposal_id|body|integer| 是 |  项目id|none|
|» win|body|string| 是 | 计票结果 (密文)|none|

> 返回示例

> 200 Response

```json
{
  "ok": true,
  "data": {
    "id": 0,
    "proposal_id": 0,
    "win": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» ok|boolean|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» proposal_id|integer|true|none||none|
|»» win|string|true|none||none|

