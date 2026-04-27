# ServiceEase - Full-Stack Service Marketplace

A comprehensive full-stack marketplace platform connecting service providers with customers, built with modern web technologies.

## 🎯 Features

### For Customers
- Browse and search services
- Request bookings with date selection
- Track booking status in real-time
- View provider profiles and ratings
- Complete bookings and leave reviews

### For Providers
- Create and manage service listings
- Set availability calendars
- Accept/reject booking requests
- Complete service deliveries
- View customer ratings and feedback

### For Administrators
- Approve/reject new providers
- Manage service categories
- Monitor platform activity
- Handle disputes (future feature)

## 🏗️ Architecture

### Backend
- **Framework:** Spring Boot 3.5.9
- **Language:** Java 17
- **Database:** PostgreSQL
- **Authentication:** JWT tokens
- **Security:** Spring Security with role-based access control

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **State Management:** Context API

📈 Project Status
Component	Status	Coverage
Core Booking	✅ Complete	100%
Authentication	✅ Complete	100%
Provider Management	✅ Complete	100%
Reviews System	🟡 Partial	40%
