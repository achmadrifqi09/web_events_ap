API Spec
| Routes | HTTP Method | Description | Middleware |
| --- | --- | --- | --- |
| /api/v1/cms/categories | GET | Get all category | Yes |
| /api/v1/cms/categories | POST | Create category | Yes |
| /api/v1/cms/categories/:id | GET | Get one category by id | Yes |
| /api/v1/cms/categories/:id | PUT | Update category | Yes |
| /api/v1/cms/categories/:id | DELETE | Delete category | Yes |

### Talents

| Routes | HTTP Method | Description | Middleware |
| --- | --- | --- | --- |
| /api/v1/cms/talents | GET | Get all talents | Yes |
| /api/v1/cms/talents | POST | Create talent | Yes |
| /api/v1/cms/talents/:id | GET | Get one talent by id | Yes |
| /api/v1/cms/talents/:id | PUT | Update talent | Yes |
| /api/v1/cms/talents/:id | DELETE | Delete talent | Yes |

### Image

| Routes | HTTP Method | Description | Middleware |
| --- | --- | --- | --- |
| /api/v1/cms/images | POST | Create/upload image | Yes |

### Events

| Routes | HTTP Method | Description | Middleware |
| --- | --- | --- | --- |
| /api/v1/cms/events | GET | Get all events | Yes |
| /api/v1/cms/events | POST | Create events | Yes |
| /api/v1/cms/events/:id | GET | Get one events by id | Yes |
| /api/v1/cms/events/:id | PUT | Update events | Yes |
| /api/v1/cms/events/:id/status | DELETE | Delete event | Yes |

### Payments

| Routes | HTTP Method | Description | Middleware |
| --- | --- | --- | --- |
| /api/v1/cms/payments | GET | Get all payments | Yes |
| /api/v1/cms/payments | POST | Create payments | Yes |
| /api/v1/cms/payments/:id | GET | Get one payment by id | Yes |
| /api/v1/cms/payments/:id | PUT | Update payments | Yes |
| /api/v1/cms/payments/:id | DELETE | Delete payments | Yes |

### Ticket categories

| Routes | HTTP Method | Description | Middleware |
| --- | --- | --- | --- |
| /api/v1/cms/ticket-categories | GET | Get all ticket categories | Yes |
| /api/v1/cms/ticket-categories | POST | Create ticket categories | Yes |
| /api/v1/cms/ticket-categories/:id | GET | Get one ticket categories by id | Yes |
| /api/v1/cms/ticket-categories/:id | PUT | Update ticket categories | Yes |
| /api/v1/cms/ticket-categories/:id | DELETE | Delete ticket categories | Yes |

### Order

| Routes | HTTP Method | Description | Middleware |
| --- | --- | --- | --- |
| /api/v1/cms/order | GET | Get all order | Yes |
| /api/v1/cms/order/:id | GET | Get one order by id | Yes |

### Auth

| Routes | HTTP Method | Description | Middleware |
| --- | --- | --- | --- |
| /api/v1/auth/signin | POST | Signin | No |
| /api/v1/auth/organizer | POST | Create admin / organizer | Yes |

### Participants

| Routes | HTTP Method | Description | Middleware |
| --- | --- | --- | --- |
| /api/v1/events | GET | Get all events | No |
| /api/v1/events/:id | GET | Get detail event by id | No |
| /api/v1/events/:id/checkout | POST | Checkout event | Yes |
| /api/v1/dashboard/ | GET | Get dashboard | Yes |
| /api/v1/dashboard/:id | GET | Get detail dashboard by id | Yes |
| /api/v1/participants/auth/signin | POST | signin | No |
| /api/v1/participants/signup | POST | signup | No |


