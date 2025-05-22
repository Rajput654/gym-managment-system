
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
      import {
        getFirestore,
        collection,
        addDoc,
        getDocs,
        deleteDoc,
        doc,
      } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";

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
      const analytics = getAnalytics(app);

      window.db = db;
      window.firestore = { collection, addDoc, getDocs, deleteDoc, doc };
    

   
      function loadSection(section) {
        const content = document.getElementById("content");

        switch (section) {
          case "members":
            content.innerHTML = `
              <h2>Manage Members</h2>
              <form id="memberForm">
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email" required />
                <input type="text" placeholder="Phone" required />
                <button type="submit">Add Member</button>
              </form>
              <div id="membersList"><p>Loading members...</p></div>
            `;
            loadMembers();
            break;

          case "viewmembers":
            content.innerHTML = `
              <h2>View Members</h2>
              <div id="membersList"><p>Loading members...</p></div>
            `;
            loadMembers();
            break;

          case "bills":
            content.innerHTML = `
              <h2>Create Bill</h2>
              <form id="billForm">
                <input type="text" placeholder="Member ID" required />
                <input type="number" placeholder="Amount" required />
                <input type="date" required />
                <button type="submit">Create Bill</button>
              </form>
            `;
            break;

          case "packages":
            content.innerHTML = `
              <h2>Assign Fee Package</h2>
              <form id="packageForm">
                <input type="text" placeholder="Member ID" required />
                <select>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Yearly</option>
                </select>
                <button type="submit">Assign</button>
              </form>
            `;
            break;

          case "notifications":
            content.innerHTML = `
              <h2>Send Notification</h2>
              <form id="notifyForm">
                <textarea placeholder="Enter message" required></textarea>
                <button type="submit">Send</button>
              </form>
            `;
            break;

          case "supplements":
            content.innerHTML = `
              <h2>Supplement Store</h2>
              <form id="supplementForm">
                <input type="text" placeholder="Supplement Name" required />
                <input type="number" placeholder="Price" required />
                <input type="number" placeholder="Stock" required />
                <button type="submit">Add Supplement</button>
              </form>
              <div id="supplementList"><p>Loading supplements...</p></div>
            `;
            break;

          case "diets":
            content.innerHTML = `
              <h2>Diet Plans</h2>
              <form id="dietForm">
                <input type="text" placeholder="Member ID" required />
                <textarea placeholder="Enter Diet Plan" required></textarea>
                <button type="submit">Assign Diet</button>
              </form>
            `;
            break;

          case "reports":
            content.innerHTML = `
              <h2>Export Reports</h2>
              <button onclick="exportToPDF()">Export to PDF</button>
              <button onclick="exportToCSV()">Export to CSV</button>
            `;
            break;

          default:
            content.innerHTML = '<h2>Welcome to Admin Dashboard</h2><p>Select a section from the sidebar to begin.</p>';
        }
      }

      document.addEventListener("submit", async (e) => {
        if (e.target.id === "memberForm") {
          e.preventDefault();
          const [nameInput, emailInput, phoneInput] = e.target.elements;
          const name = nameInput.value.trim();
          const email = emailInput.value.trim();
          const phone = phoneInput.value.trim();

          if (name && email && phone) {
            try {
              await firestore.addDoc(firestore.collection(db, "members"), {
                name,
                email,
                phone,
              });
              alert("Member added successfully!");
              e.target.reset();
              loadMembers();
            } catch (err) {
              console.error("Error adding member: ", err);
              alert("Failed to add member.");
            }
          }
        }
      });

      async function loadMembers() {
        const membersDiv = document.getElementById("membersList");
        membersDiv.innerHTML = "<p>Loading...</p>";

        try {
          const querySnapshot = await firestore.getDocs(firestore.collection(db, "members"));
          let html = `<table><tr><th>Name</th><th>Email</th><th>Phone</th><th>Action</th></tr>`;
          querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            html += `
              <tr>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.phone}</td>
                <td><button class="delete-btn" onclick="deleteMember('${docSnap.id}')">Delete</button></td>
              </tr>
            `;
          });
          html += `</table>`;
          membersDiv.innerHTML = html;
        } catch (err) {
          console.error("Error loading members: ", err);
          membersDiv.innerHTML = "<p>Error loading members.</p>";
        }
      }

      async function deleteMember(id) {
        if (confirm("Are you sure you want to delete this member?")) {
          try {
            await firestore.deleteDoc(firestore.doc(db, "members", id));
            alert("Deleted successfully");
            loadMembers();
          } catch (err) {
            console.error("Error deleting member:", err);
            alert("Failed to delete");
          }
        }
      }

      function exportToPDF() {
        alert("Export to PDF logic goes here.");
      }

      function exportToCSV() {
        alert("Export to CSV logic goes here.");
      }
    