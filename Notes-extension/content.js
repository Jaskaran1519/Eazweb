document.addEventListener('DOMContentLoaded', function () {
  const taskList = document.getElementById('task-list');
  const taskInput = document.getElementById('task-input');
  const addTaskButton = document.getElementById('add-task');
  const clearTasksButton = document.getElementById('clear-tasks');

  // Load tasks from storage and display them
  chrome.storage.sync.get(['tasks'], function (result) {
    if (result.tasks) {
      result.tasks.forEach(function (task) {
        addTaskToList(task);
      });
    }
  });

  // Add a new task with a time
  addTaskButton.addEventListener('click', function () {
    const task = taskInput.value;
    const time = document.getElementById('task-time').value;
    if (task) {
      addTaskToList(task, time);
      taskInput.value = '';
      document.getElementById('task-time').value = '';

      // Save tasks to storage
      chrome.storage.sync.get(['tasks'], function (result) {
        const tasks = result.tasks || [];
        tasks.push(JSON.stringify({ text: task, time: time }));
        chrome.storage.sync.set({ tasks: tasks });
      });
    }
  });

  // Clear all tasks
  clearTasksButton.addEventListener('click', function () {
    taskList.innerHTML = '';

    // Clear tasks in storage
    chrome.storage.sync.remove('tasks');
  });

  // Helper function to add a task to the list
  function addTaskToList(task, time) {
    const li = document.createElement('li');
    if (time) {
      li.textContent = `${task} (at ${time})`;
    } else {
      li.textContent = task;
    }
    taskList.appendChild(li);
  }
});

// This part handles reminders and notifications
// Check for reminders every minute (adjust the interval as needed)
setInterval(checkReminders, 60000);

// Function to check reminders and display notifications
function checkReminders() {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const activeTabId = // Get the ID of the currently active tab using chrome.tabs API.

  chrome.storage.sync.get(['tasks'], function (result) {
    if (result.tasks) {
      result.tasks.forEach(function (task) {
        const taskData = JSON.parse(task);
        if (taskData.time === now) {
          // Show a notification
          showNotification(taskData.text, taskData.time);

          // Send an alert to the active tab
          sendAlertToTab(activeTabId, taskData.text);
        }
      });
    }
  });
}

// Function to send an alert to the active tab
function sendAlertToTab(tabId, message) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: function (message) {
      alert(message);
    },
    args: [message],
  });
}



// Function to display a notification
function showNotification(taskText, taskTime) {
  const options = {
    type: 'basic',
    title: 'Task Reminder',
    message: `Task: ${taskText}\nTime: ${taskTime}`,
    iconUrl: 'images/icon48.png',
  };
  chrome.notifications.create('reminder', options);
}


// Handle notification clicks
chrome.notifications.onClicked.addListener(function () {
  // Open your extension's popup when a notification is clicked
  chrome.action.openPopup();
});
