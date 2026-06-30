import React, { useState } from "react";
import { View } from "react-native";
import { Appbar, IconButton, Icon } from "react-native-paper";
import CTextInput from "./CTextInput";
import CBottomNav from "./CBottomNav";

const _ = () => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Appbar.Header
        style={{
          backgroundColor: "#534DB3",
          padding: 0,
          margin: 5,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Icon source="magnify" color="white" size={20} />
          <CTextInput
            onBlur={(e: any) => {
              setLocation(address);
            }}
            onChangeText={(text: string) => setAddress(text)}
            textColor="white"
            label="Location"
            msg={address}
            placeholder="Search location..."
            variant="flat"
            outlineColor="white"
            activeOutlineColor="white"
            underlineColor="white"
            activeUnderlineColor="white"
            selectionColor="white"
            contentStyle={{}}
            style={{
              backgroundColor: "transparent",
              width: "75%",
              borderRadius: 15,
              borderColor: "white",
            }}
          />
        </View>
        <IconButton
          icon="navigation"
          iconColor="white"
          size={20}
          onPress={() => {
            setLocation("Geolocation");
          }}
          style={{ transform: "rotate(45deg);" }}
        />
      </Appbar.Header>
      <View
        style={{
          // width: "100%" / height: "100%"
          // Prend 100% de la taille du parent direct. Ça peut poser problème si le parent n'a pas de taille définie.
          // flex: 1
          // Prend tout l'espace disponible restant dans le parent, en tenant compte des autres enfants.
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CBottomNav location={location} />
        </View>
      </View>
    </View>
  );
};

export default _;
