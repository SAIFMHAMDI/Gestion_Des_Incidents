const createError = require("http-errors");
const express = require("express");
const path = require("path"); 
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./dbconnection");
const loginRouter = require("./Mobile/login");
const resetPassword = require("./Mobile/resetPassword");
const ToggleNotifRouter = require("./Mobile/ToggleNotif");
const acceptationRouter = require("./Mobile/accept");
const confirmationRouter = require("./Mobile/confirmation");
const ToggleFavorisRouter = require("./Mobile/ToggleFavoris");
const missionRouter = require("./Mobile/mission");
const listeFavorisRouter = require("./Mobile/listeFavoris");
const listeMessageRouter = require("./Mobile/listeMessage");
const EnvoieMessageRouter = require("./Mobile/EnvoieMessage");
const recherche_incidentsRouter=require("./Mobile/recherche_incidents");
const notificationsRouter = require("./Mobile/notifications");
const push_tokenRouter = require("./Mobile/push_token.js");
const searchByAdressOrderRouter = require("./Mobile/searchByAdressOrder");
const searchByStatuOrderRouter = require("./Mobile/searchByStatuOrder");
const searchByStatuAdressRouter = require("./Mobile/searchByStatuAdress");
const loginAdminRouter = require("./Web/Admin/loginAdmin");
const AccountTechnicienRouter = require("./Web/Admin/AccountTechnicien");
const AccountOperateurRouter = require("./Web/Admin/OperateurAccount");
const CategorieOperateurRouter = require("./Web/Admin/CategorieOperateur");
const SendMissionsRouter = require("./Web/Admin/SendMissions");
const loginOperateurRouter = require("./Web/Operateur/loginOperateur");
const resetPasswordOperateurRouter = require("./Web/Operateur/resetPasswordOperateur");
const AddMissionRouter = require("./Web/Operateur/AddMission");
const ListMissionRouter = require("./Web/Operateur/ListMission");
const ReclamationRouter = require("./Web/Operateur/Reclamation");


const app = express();
app.use(express.json());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(missionRouter);
app.use(EnvoieMessageRouter);
app.use(AccountTechnicienRouter);
app.use(ListMissionRouter);
app.use(AddMissionRouter);
app.use(SendMissionsRouter);
app.use(AccountOperateurRouter);
app.use(CategorieOperateurRouter);
app.use(notificationsRouter);
app.use(ReclamationRouter);
app.use(loginAdminRouter);
app.use(loginOperateurRouter);
app.use(searchByAdressOrderRouter);
app.use(searchByStatuAdressRouter);
app.use(push_tokenRouter);
app.use(searchByStatuOrderRouter);
app.use(listeMessageRouter);
app.use(listeFavorisRouter);
app.use(ToggleFavorisRouter);
app.use(recherche_incidentsRouter);
app.use(confirmationRouter);
app.use(acceptationRouter);
app.use(loginRouter);
app.use(resetPassword);
app.use(resetPasswordOperateurRouter);
app.use(ToggleNotifRouter);

 // Handling Errors
 app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});
app.listen(4000, () => console.log("Server is running on port 4000"));
