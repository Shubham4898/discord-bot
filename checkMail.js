const { google } = require("googleapis");
 
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});


async function mail(){
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
 const spreadsheetId = "1EnuWfCLznYFSUWJD8I4lcm8E6cMGgsne3i-uYMFMhMA";
 const data = await googleSheets.spreadsheets.values.get({
   auth,
   spreadsheetId,
   range: "Sheet2",
 
 });
 console.log(data.data.values);
 return data.data.values;
 
 }
 

 module.exports.mail = mail;

