# Provider API Integration

## Base URL

- `NEXT_PUBLIC_API_BASE_URL`
- Default used by the frontend client: `http://localhost:5000`

## Functional Endpoints Ready For Frontend

### Auth

- `POST /api/auth/v1/login`
  Request:
  ```json
  { "email": "provider@email.com", "password": "Secret123!" }
  ```
  Response:
  ```json
  {
    "access_token": "token",
    "refresh_token": "token",
    "user": { "id": "uuid", "email": "provider@email.com", "full_name": "Provider", "role": "provider" }
  }
  ```

- `GET /api/auth/v1/me`
  Headers:
  ```http
  Authorization: Bearer <access_token>
  ```
  Response:
  ```json
  {
    "user": {
      "id": "uuid",
      "full_name": "Provider",
      "email": "provider@email.com",
      "contact_number": "0917...",
      "role": "provider",
      "status": "active"
    }
  }
  ```

- `POST /api/auth/v1/refresh`
- `POST /api/auth/v1/logout`

### Provider

- `GET /api/provider/v1/:user_id`
  Response shape:
  ```json
  {
    "status": "success",
    "data": {
      "user_id": "uuid",
      "business_name": "Business",
      "service_description": "Description",
      "verification_status": "approved",
      "average_rating": 4.8,
      "total_reviews": 12,
      "trust_score": 95
    }
  }
  ```

- `GET /api/provider/v1/dashboard/:id`
- `GET /api/provider/v1/bookings`
- `GET /api/provider/v1/booking/:id`
- `PATCH /api/provider/v1/booking/:id/status`
- `GET /api/provider/v1/my-services`
- `POST /api/provider/v1/my-services`
- `PATCH /api/provider/v1/my-services/:serviceId`
- `DELETE /api/provider/v1/my-services/:serviceId`
- `GET /api/provider/v1/:id/availability`
- `PUT /api/provider/v1/availability`
- `GET /api/provider/v1/:id/reserved-slots`
- `GET /api/provider/v1/:id/availability/check`
- `POST /api/provider/v1/reschedule-requests`
- `GET /api/provider/v1/reschedule-requests/:bookingId`
- `PATCH /api/provider/v1/reschedule-requests/:requestId/review`
- `POST /api/provider/v1/additional-charges`
- `GET /api/provider/v1/additional-charges/:bookingId`
- `PATCH /api/provider/v1/additional-charges/review`
- `POST /api/provider/v1/reviews`
- `POST /api/provider/v1/reports`
- `PATCH /api/provider/v1/kyc/reupload`

### Payments

- `GET /api/payments/v1/provider/history`
- `GET /api/payments/v1/provider/earnings-summary`
- `GET /api/payments/v1/booking/:bookingId`
- `POST /api/payments/v1/booking/ensure`

### Chat

- `GET /api/chat/v1/conversations?role=provider`
- `GET /api/chat/v1/conversations/:bookingId/messages`
- `POST /api/chat/v1/conversations/:bookingId/messages`
- `PATCH /api/chat/v1/conversations/:bookingId/read`

### Notifications

- `GET /api/notifications/v1`
- `GET /api/notifications/v1/unread-count`
- `PATCH /api/notifications/v1/:id/read`
- `PATCH /api/notifications/v1/read-all`

### Support

- `POST /api/support/v1/tickets`

## Stubbed Or Incomplete Endpoints

- `GET /api/provider/v1` without `serviceId` or `search`
  Returns an empty success payload from the gateway instead of real data.

- No dedicated secure provider profile update endpoint
  Current backend only exposes `PATCH /api/provider/v1/:id/profile-draft`, which should not be treated as a final profile management API.

- No provider payout request endpoint found
  The provider earnings screens can read payment data, but payout request submission is not implemented in the analyzed backend.

- No notification preferences settings endpoint found
  Notification read/unread works, but provider preference persistence is not available.

## Security / Backend Risks To Track

- Several authenticated endpoints trust route params instead of enforcing ownership from the bearer token.
- `PATCH /api/provider/v1/:id/profile-draft` is not auth-guarded in the current backend.
- Many mutations return `202 accepted` and complete asynchronously through Kafka.

## Frontend Integration Priority

1. Login and protected session flow
2. Provider profile, services, and availability
3. Provider bookings and booking actions
4. Earnings dashboard and payment history
5. Messages and notifications
6. Settings and lower-priority preference pages

## Current Frontend Integrations

- `LoginPage`
  Uses `POST /api/auth/v1/login`

- `ProtectedRoute` and `AuthContext`
  Use `GET /api/auth/v1/me` plus token persistence

- `ProviderDataContext`
  Uses:
  - `GET /api/provider/v1/:user_id`
  - `GET /api/provider/v1/my-services`
  - `GET /api/provider/v1/:id/availability`

- `DashboardPage`
  Uses:
  - `GET /api/provider/v1/dashboard/:id`
  - `GET /api/provider/v1/bookings`
  - `GET /api/payments/v1/provider/earnings-summary`

- `UnifiedBookingsPage`
  Uses:
  - `GET /api/provider/v1/bookings`
  - `PATCH /api/provider/v1/booking/:id/status`

- `ProviderEarningsDashboard`
  Uses:
  - `GET /api/payments/v1/provider/history`
  - `GET /api/payments/v1/provider/earnings-summary`

- `MessagesPage`
  Uses:
  - `GET /api/chat/v1/conversations?role=provider`
  - `GET /api/chat/v1/conversations/:bookingId/messages`
  - `POST /api/chat/v1/conversations/:bookingId/messages`
