#!/bin/bash
# PHASE 1 Verification Script
# Run this to verify all security changes are working

echo "================================"
echo "PHASE 1: Security Verification"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Test 1: Check if .env exists
echo "Test 1: Checking .env file exists..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env file exists${NC}"
else
    echo -e "${RED}❌ .env file NOT found${NC}"
fi
echo ""

# Test 2: Check if .env.example exists
echo "Test 2: Checking .env.example exists..."
if [ -f ".env.example" ]; then
    echo -e "${GREEN}✅ .env.example file exists${NC}"
else
    echo -e "${RED}❌ .env.example file NOT found${NC}"
fi
echo ""

# Test 3: Check if .env is in .gitignore
echo "Test 3: Checking .env is in .gitignore..."
if grep -q "^\.env$" .gitignore; then
    echo -e "${GREEN}✅ .env is in .gitignore${NC}"
else
    echo -e "${RED}❌ .env is NOT in .gitignore${NC}"
fi
echo ""

# Test 4: Check backend files exist
echo "Test 4: Checking backend security files..."
BACKEND_FILES=(
    "serviceease-backend/src/main/resources/application.yml"
    "serviceease-backend/src/main/resources/application-prod.yml"
    "serviceease-backend/src/main/java/com/serviceease/util/PasswordValidator.java"
    "serviceease-backend/src/main/java/com/serviceease/security/JwtService.java"
    "serviceease-backend/src/main/java/com/serviceease/security/SecurityConfig.java"
)

for file in "${BACKEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file NOT found${NC}"
    fi
done
echo ""

# Test 5: Check frontend files exist
echo "Test 5: Checking frontend security files..."
FRONTEND_FILES=(
    "serviceease-frontend/.env.example"
    "serviceease-frontend/src/api/axios.js"
)

for file in "${FRONTEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file NOT found${NC}"
    fi
done
echo ""

echo "================================"
echo "Verification Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. mvn clean install (from serviceease-backend)"
echo "2. mvn spring-boot:run (from serviceease-backend)"
echo "3. npm run dev (from serviceease-frontend)"
echo "4. Test with Postman using credentials:"
echo "   - Email: test@example.com"
echo "   - Password: TestPass@123"

