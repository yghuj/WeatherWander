document.getElementById('clear-storage-btn').addEventListener('click', function() {
    if (confirm("Are you sure you want to clear all local storage?")) {
        localStorage.clear(); // Clear all items from local storage
        console.log("Local storage cleared.");
        alert("Local storage has been cleared."); // Notify the user
    } else {
        console.log("Clear operation canceled.");
    }
});