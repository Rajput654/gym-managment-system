 
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
    import {
      getFirestore,
      collection,
      query,
      where,
      getDocs
    } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

     const firebaseConfig = {
        apiKey: "AIzaSyDfSfc_QEbZpGMWcC1DC7xwmS35IgydSHQ",
        authDomain: "gym-management-system-2b739.firebaseapp.com",
        projectId: "gym-management-system-2b739",
        storageBucket: "gym-management-system-2b739.firebasestorage.app",
        messagingSenderId: "910878552565",
        appId: "1:910878552565:web:e176dd1ac02dd01245f0bc",
        measurementId: "G-GY3EJXXV3H"
      };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const loginSection = document.getElementById("loginSection");
    const dashboardSection = document.getElementById("dashboardSection");
    const userLoginBtn = document.getElementById("userLoginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const userEmail = document.getElementById("userEmail");
    const loginError = document.getElementById("loginError");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const resultsSection = document.getElementById("resultsSection");

    userLoginBtn.addEventListener("click", () => {
      if (userEmail.value.trim() === "") {
        loginError.textContent = "Please enter a valid email or username.";
        return;
      }
      loginError.textContent = "";
      loginSection.style.display = "none";
      dashboardSection.style.display = "block";
    });

    logoutBtn.addEventListener("click", () => {
      userEmail.value = "";
      searchInput.value = "";
      resultsSection.innerHTML = "";
      dashboardSection.style.display = "none";
      loginSection.style.display = "block";
    });

    searchBtn.addEventListener("click", async () => {
      const searchValue = searchInput.value.trim().toLowerCase();
      if (!searchValue) {
        resultsSection.innerHTML = "<p>Please enter a search term.</p>";
        return;
      }

      resultsSection.innerHTML = "<p>Searching...</p>";

      try {
        const membersRef = collection(db, "members");
        const qName = query(membersRef, where("name", "==", searchValue));
        const qId = query(membersRef, where("memberId", "==", searchValue));

        const [snapByName, snapById] = await Promise.all([
          getDocs(qName),
          getDocs(qId)
        ]);

        const results = [...snapByName.docs, ...snapById.docs];

        if (results.length === 0) {
          resultsSection.innerHTML = "<p>No matching members found.</p>";
          return;
        }

        let html = `<table>
          <tr><th>Name</th><th>Email</th><th>Member ID</th><th>Age</th><th>Membership</th></tr>`;

        results.forEach(doc => {
          const data = doc.data();
          html += `<tr>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.memberId}</td>
            <td>${data.age || '-'}</td>
            <td>${data.membershipType || '-'}</td>
          </tr>`;
        });

        html += "</table>";
        resultsSection.innerHTML = html;
      } catch (err) {
        console.error(err);
        resultsSection.innerHTML = "<p>Error while searching. Try again.</p>";
      }
    });
  