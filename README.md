# NodeApp-CI-Extended

Small Node.js app (Celsius to Fahrenheit converter) created for a Jenkins pipeline demo.

Project highlights:
- Endpoint: GET /convert?c=VALUE -> returns { c, f }
- Tests: Jest + Supertest
- Lint: ESLint
- Build: creates artifact.zip containing key files
- Jenkins pipeline name (suggested): NodeApp-CI-Extended (see `Jenkinsfile`)

Quick local steps (Windows PowerShell):

```powershell
cd 'C:\Users\HUAWEI\Desktop\Jenkins Task-2'
npm install
npm run lint
npm test
npm run archive
```

The Jenkins pipeline performs these steps and prints a simulated email notification:
- Clone
- Install dependencies
- Run lint
- Run tests
- Archive artifact (artifact.zip)
- On success/failure it prints: "Email sent to team@example.com"
