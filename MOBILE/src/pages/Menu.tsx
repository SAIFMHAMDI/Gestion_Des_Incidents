import React, { useEffect } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonSplitPane,
  IonMenu,
  IonRouterOutlet,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonButton,
} from "@ionic/react";
import {
  extensionPuzzleOutline,
  heartOutline,
  personOutline,
  chatboxEllipsesOutline,
  logOutOutline,
  notificationsOutline,
  cloudUploadOutline,
  chevronForwardOutline,
} from "ionicons/icons";

import "./Home.css";
import { Route } from "react-router";
import Feedbacks from "./Feedbacks";
import Profile from "./Profile";
import Notification from "./Notifications";
import Chat from "./Chat";
import Favorites from "./Favourites";
import Mission from "./Mission";
import { useHistory } from "react-router";
import { Preferences } from "@capacitor/preferences";
const Menu: React.FC = () => {

const history= useHistory();
useEffect(()=>{

  (async () => {
    let user_obj: any = await Preferences.get({ key: 'user_obj' });
    if (user_obj === null || user_obj.value==null) {
      history.push("/login");
      return;
    }
  })();

},[]);

  const paths = [
    { name: "profile", url: "/Menu/profile", icon: personOutline },
    { name: "Messages", url: "/Menu/chat", icon: chatboxEllipsesOutline },
    { name: "Missions", url: "/Menu/Mission", icon: extensionPuzzleOutline },
    {
      name: "Notifcations",
      url: "/Menu/notification",
      icon: notificationsOutline,
    },
    { name: "Favorites", url: "/Menu/Favorite", icon: heartOutline },
    /*{ name: "Feedbacks", url: "/Menu/Feedbacks", icon: cloudUploadOutline },*/
  ];
  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu contentId="main" className="my-menu">
          <IonHeader id="my-header">
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="my-menu-content">
            {paths.map((item, index) => (
              <IonMenuToggle key={index}>
                <IonItem routerLink={item.url} routerDirection="forward">
                  <IonIcon icon={item.icon} slot="start" />

                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}
            <IonButton
              routerLink="/login"
              onClick={() => {
                //  Preferences.remove({ key: 'user_obj' });
              }}
              routerDirection="forward"
              expand="full"
            >
              <IonIcon icon={logOutOutline} slot="start"></IonIcon>
              logout
            </IonButton>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="main">
          <Route exact path="/Menu/Feedbacks" component={Feedbacks} />
          <Route exact path="/Menu/profile" component={Profile} />
          <Route exact path="/Menu/notification" component={Notification} />
          <Route exact path="/Menu/chat" component={Chat} />
          <Route exact path="/Menu/Favorite" component={Favorites} />
          <Route exact path="/Menu/Mission" component={Mission} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
