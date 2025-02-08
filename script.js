// JavaScript to handle Tally Data Import and Excel Generation

document.getElementById('tallyForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const output = document.getElementById('output');
            const dataOutput = document.getElementById('dataOutput');
            const downloadBtn = document.getElementById('downloadBtn');

            dataOutput.textContent = e.target.result;
            output.classList.remove('hidden');
            downloadBtn.classList.remove('hidden');
        };
        reader.readAsText(file);
    } else {
        alert('Please select a file to import.');
    }
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    const data = document.getElementById('dataOutput').textContent;
    let jsonData;

    try {
        jsonData = JSON.parse(data);
    } catch (e) {
        alert('The file format is not supported for conversion. Please upload a valid JSON file.');
        return;
    }

    const workbook = XLSX.utils.book_new();

    // Prepare Balance Sheet
    const balanceSheetData = [
        { "Particulars": "Assets", "Amount": jsonData.assets || 0 },
        { "Particulars": "Liabilities", "Amount": jsonData.liabilities || 0 },
        { "Particulars": "Equity", "Amount": jsonData.equity || 0 }
    ];
    const balanceSheet = XLSX.utils.json_to_sheet(balanceSheetData);
    XLSX.utils.book_append_sheet(workbook, balanceSheet, "Balance Sheet");

    // Prepare Profit & Loss Account
    const profitLossData = [
        { "Particulars": "Revenue", "Amount": jsonData.revenue || 0 },
        { "Particulars": "Expenses", "Amount": jsonData.expenses || 0 },
        { "Particulars": "Net Profit", "Amount": (jsonData.revenue || 0) - (jsonData.expenses || 0) }
    ];
    const profitLoss = XLSX.utils.json_to_sheet(profitLossData);
    XLSX.utils.book_append_sheet(workbook, profitLoss, "Profit & Loss");

    // Prepare Notes to Accounts
    const notesData = jsonData.notes || [{ "Note": "No additional notes provided." }];
    const notesSheet = XLSX.utils.json_to_sheet(notesData);
    XLSX.utils.book_append_sheet(workbook, notesSheet, "Notes to Accounts");

    XLSX.writeFile(workbook, "Financial_Statements_Compliance_Companies_Act_2013.xlsx");
});
