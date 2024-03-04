// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";
// import styles from "./return-and-pickup.styles";
// import returnAndPickup from "../../assets/return.png";
// import TopBar from "../../components/TopBar/TopBar";

// const ReturnAndPickup = () => {
//   const { height } = Dimensions.get("screen");

//   const handleSubmit = () => {
//     console.log(payData);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         {/* TOPBAR CONTAINER */}
//         <TopBar name="Return And Pickup" link="HomeScreen" />
//         {/* IMAGE CONTAINER */}
//         <View style={styles.imgContainer}>
//           <Image source={returnAndPickup} style={{ height: 70, width: 70 }} />
//           <Text style={styles.mainText}>Return And Pickup</Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ReturnAndPickup;

import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import styles from "./return-and-pickup.styles";
import Briefing from "../../assets/briefing-1.png";
import { TextArea } from "../../components/TextInput/TextInput";
import TopBar from "../../components/TopBar/TopBar";
import { useAuthContext } from "../../context/AuthContext";
import { usePostContext } from "../../context/PostContext";
import { useNavigation } from "@react-navigation/native";
import { useFetchContext } from "../../context/FetchContext";

const ReturnAndPickup = () => {
  const { height } = Dimensions.get("screen");
  const { filteredShifts } = useFetchContext();
  const { user } = useAuthContext();
  const { PostBriefingData } = usePostContext();
  const navigation = useNavigation();

  const [data, setData] = useState({
    guardID: user._id,
    shiftID: filteredShifts?.currentShift?._id,
    message: "",
  });
  const handleTextChange = (field, newText) => {
    setData((prevPayData) => ({
      ...prevPayData,
      [field]: newText,
    }));
  };

  return (
    <View style={styles.container}>
      {/* TOPBAR CONTAINER */}
      <TopBar name="Briefing Box" link="HomeScreen" />
      {/* IMAGE CONTAINER */}
      <View style={styles.imgContainer}>
        <Image source={Briefing} style={styles.img} />
        <Text style={styles.mainText}>Write a Brief Message</Text>
      </View>
      {/* TEXT INPUT CONTAINER */}
      <SafeAreaView style={{ marginBottom: height >= 826 ? 20 : 0 }}>
        <TextArea
          value={data.message}
          placeholder={"Write a message"}
          onTextChange={(newText) => handleTextChange("message", newText)}
        />
      </SafeAreaView>
      {/* BUTTON  */}
      <Pressable style={styles.btnContainer}>
        <Text style={styles.btnText}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default ReturnAndPickup;
