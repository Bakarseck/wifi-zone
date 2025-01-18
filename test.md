Here’s a simple **cURL script** to sequentially test your APIs and create one user with 5 WiFi zones. You can run each command directly in your terminal or put them in a shell script.

---

### **1. Create a User**
```bash
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "123456789",
  "password": "securePassword123"
}'
```

### **2. Create WiFi Zones**
Replace `<USER_ID>` with the user ID returned from the previous step.

#### WiFi Zone 1
```bash
curl -X POST http://localhost:3000/api/wifi-zones/create \
-H "Content-Type: application/json" \
-d '{
  "name": "Zone 1",
  "description": "Description 1",
  "dns": "dns1.example.com",
  "contact": "123456789",
  "system": "Mik",
  "userId": <USER_ID>
}'
```

#### WiFi Zone 2
```bash
curl -X POST http://localhost:3000/api/wifi-zones/create \
-H "Content-Type: application/json" \
-d '{
  "name": "Zone 2",
  "description": "Description 2",
  "dns": "dns2.example.com",
  "contact": "123456789",
  "system": "Graze",
  "userId": 1
}'
```

#### WiFi Zone 3
```bash
curl -X POST http://localhost:3000/api/wifi-zones/create \
-H "Content-Type: application/json" \
-d '{
  "name": "Zone 3",
  "description": "Description 3",
  "dns": "dns3.example.com",
  "contact": "123456789",
  "system": "True",
  "userId": <USER_ID>
}'
```

#### WiFi Zone 4
```bash
curl -X POST http://localhost:3000/api/wifi-zones/create \
-H "Content-Type: application/json" \
-d '{
  "name": "Zone 4",
  "description": "Description 4",
  "dns": "dns4.example.com",
  "contact": "123456789",
  "system": "Mik",
  "userId": <USER_ID>
}'
```

#### WiFi Zone 5
```bash
curl -X POST http://localhost:3000/api/wifi-zones/create \
-H "Content-Type: application/json" \
-d '{
  "name": "Zone 5",
  "description": "Description 5",
  "dns": "dns5.example.com",
  "contact": "123456789",
  "system": "Graze",
  "userId": <USER_ID>
}'
```

---

### **3. Fetch All WiFi Zones for the User**
Replace `<USER_ID>` with the same ID used above:

```bash
curl -X GET "http://localhost:3000/api/dashboard?userId=<USER_ID>" \
-H "Content-Type: application/json"
```

---

### **How to Use**
1. Run each command step-by-step, replacing `<USER_ID>` with the actual ID from the user creation response.
2. If you want to automate it, place these commands in a shell script (`test.sh`), replace `<USER_ID>` programmatically, and execute it.

---

If you encounter issues or need further simplifications, let me know!