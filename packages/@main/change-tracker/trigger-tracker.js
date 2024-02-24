const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const filePath = 'change-tracker/index.txt'; // Replace with your desired file path

function createOrUpdateFile() {
  const newUuid = uuidv4();

  try {
    // Read existing file content if it exists
    let existingContent = '';
    if (fs.existsSync(filePath)) {
      existingContent = fs.readFileSync(filePath, 'utf8');
    }

    // Generate a new UUID only if it differs from existing file content (if any)
    const writeContent = newUuid !== existingContent ? newUuid : existingContent;

    // Write content to the file
    fs.writeFileSync(filePath, writeContent, 'utf8');
    console.log(`File ${filePath} has been created or updated with UUID: ${newUuid}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createOrUpdateFile()