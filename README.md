🕵️‍♂️ PROJECT: STATIC INVESTIGATION (IPFS BUILD)
Status: ARCHIVED / STATIC Architecture: Serverless / Decentralized Deployment: IPFS (InterPlanetary File System)

O Projekcie
Ten projekt jest statyczną kopią (snapshotem) materiału śledczego. Został przekonwertowany z dynamicznej aplikacji do formy statycznego HTML/JS, aby zapewnić trwałość danych i odporność na cenzurę (takedown attempts).

Kluczowe cechy architektury:
Brak Backendu: Wszystkie bazy danych i API zostały usunięte. Nie ma serwera, który można wyłączyć.
IPFS Distribution: Strona jest hostowana w sieci rozproszonej. Hash contentu jest stały.
Client-Side Gate: Treść jest ukryta za wizualną warstwą PasswordProtect.tsx. UWAGA: To nie jest szyfrowanie kryptograficzne, a jedynie bariera przed przypadkowym dostępem (spoiler protection) przed oficjalną premierą.
Struktura Katalogów (Po czystce)
/out - Tutaj ląduje zbudowana strona gotowa dla IPFS.
/app - Kod źródłowy React/Next.js (tylko frontend).
Legacy Code Note: Wszelkie odwołania do prisma lub POST /api w kodzie są pozostałością i nie będą działać.
Jak uruchomić lokalnie?
Tylko frontend (bez bazy danych):

```bash npm install npm run dev ```

Jak zbudować na produkcję (IPFS)?
To polecenie wygeneruje statyczne pliki w folderze out/:

```bash npm run build ```

Następnie folder out należy wrzucić do IPFS (np. przez Fleek lub IPFS Desktop).
