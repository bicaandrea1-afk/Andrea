// Funksioni për të ruajtur notat
function saveGrade(grade) {
    let grades = JSON.parse(localStorage.getItem('grades')) || [];
    grades.push(grade);
    localStorage.setItem('grades', JSON.stringify(grades));
}

// Funksioni për të formatuar datën
function formatDate(dateString) {
    const options = { year: '2-digit', month: 'short', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('sq-AL', options).replace(/ /g, ' ').replace(',', ' ');
}

// Funksioni për të ngarkuar dhe shfaqur notat në tabelë
function loadGrades() {
    const grades = JSON.parse(localStorage.getItem('grades')) || [];
    const tableBody = document.getElementById('grades-table-body');
    
    if (!tableBody) return; // Sigurohuni që jemi në faqen e duhur

    tableBody.innerHTML = ''; // Zbrazni trupin ekzistues të tabelës

    if (grades.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="no-data">Nuk ka nota të regjistruara.</td></tr>';
        return;
    }

    grades.forEach(grade => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${formatDate(grade.data)}</td>
            <td>${grade.studenti}</td>
            <td>${grade.lenda}</td>
            <td>${grade.komentet}</td>
            <td>${grade.nota}</td>
        `;
    });
}

// Lidhja e formës vetëm në faqen index.html
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('grade-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const newGrade = {
                studenti: document.getElementById('studenti').value,
                lenda: document.getElementById('lendet').value,
                nota: document.getElementById('nota').value,
                data: document.getElementById('data').value,
                komentet: document.getElementById('komentet').value
            };

            saveGrade(newGrade);
            form.reset(); // Pastron fushat pas shtimit

            // Shfaq mesazhin e suksesit
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.style.display = 'flex';
                // Fsheh mesazhin pas 3 sekondash
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            }
        });
    }

    // Ngarkon notat kur hapet faqja all-grades.html
    if (document.getElementById('grades-table-body')) {
        loadGrades();
    }
});