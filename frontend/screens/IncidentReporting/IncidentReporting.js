import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styles from "./incident-reporting.styles";
import placeholder from "../../assets/Component-Placeholder-Image.png";
import * as ImagePicker from "expo-image-picker";
import {
  RNDateTimePicker,
  TextField,
  RNDropDownPicker,
} from "../../components/TextInput/TextInput";
import TopBar from "../../components/TopBar/TopBar";
import { COLORS } from "../../constant/theme";
import { useFetchContext } from "../../context/FetchContext";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { usePostContext } from "../../context/PostContext";
import { useNavigation } from "@react-navigation/native";

const IncidentReporting = () => {
  const { token, user } = useAuthContext();
  const { PostIncidentData } = usePostContext();
  const navigation = useNavigation();
  const { reportFields, locations, GetReportFields, fetchLocationData } =
    useFetchContext();
  const { height, width } = Dimensions.get("screen");
  const [imagePreview, setImagePreview] = useState(null);

  const [data, setData] = React.useState({
    securityGuardID: user._id,
    reportType: "",
    heading: "",
    incidentDate: "",
    location: "",
    locationDetails: "",
    narrative: "",
    incidentAssets: [],
  });
  const dataForDropDown = () => {
    if (reportFields !== null) {
      const data = [];
      reportFields.map((ele) =>
        data.push({ label: ele.fieldName, value: ele, key: ele._id })
      );
      return data;
    }
  };
  console.log("REPORT FIELDS: ", reportFields);
  console.log("LOCATIONS: ", locations);
  useEffect(() => {
    dataForDropDown();
  }, [reportFields]);
  const dataForLocationDropDown = () => {
    if (locations) {
      let data = [];
      locations.map((ele) =>
        data.push({ label: ele.locationName, value: ele, key: ele._id })
      );
      return data;
    }
  };
  useEffect(() => {
    dataForLocationDropDown();
  }, [locations]);
  const handleTextChange = (field, newText) => {
    setData((prevPayData) => ({
      ...prevPayData,
      [field]: newText,
    }));
  };
  const handleSubmit = async () => {
    console.log("DATA TO SEND: ", data);
    await PostIncidentData(data);
    setData({
      reportType: "",
      heading: "",
      incidentDate: "",
      location: "",
      locationDetails: "",
      narrative: "",
      incidentAssets: [],
    });
    setImagePreview(null);
    navigation.navigate("HomeScreen");
  };
  const handleImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted === false) {
      console.log("Permission Denied");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const images = result.assets.map((img) => img.uri);
      setImagePreview(images);
      setData({
        ...data,
        incidentAssets: result.assets.map(
          (img) => `data:image/jpg;base64,${img.base64}`
        ),
      });
    }
  };

  useEffect(() => {
    fetchLocationData();
    GetReportFields();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <TopBar name="Incident Reporting" link="HomeScreen" />
        {/* IMAGE CONTAINER */}
        <SafeAreaView style={styles.imgContainer}>
          <Image
            source={require("../../assets/incident-reporting-icon.png")}
            style={styles.img}
          />
          <Text style={styles.mainText}>Incident Reporting</Text>
        </SafeAreaView>
        {/* TEXT INPUT CONTAINER */}
        <ScrollView
          contentContainerStyle={{
            marginTop: 40,
            marginBottom: height >= 826 ? 20 : 0,
            alignSelf: "center",
            gap: 10,
          }}
        >
          <View style={{ alignSelf: "center", gap: 10, zIndex: 100 }}>
            {reportFields !== null && (
              <RNDropDownPicker
                providedData={dataForDropDown()}
                placeholder={"Report Type"}
                getValue={(newValue) =>
                  setData({ ...data, reportType: newValue._id })
                }
              />
            )}
            <TextField
              placeholder={"Heading"}
              value={data.heading}
              onTextChange={(newText) => handleTextChange("heading", newText)}
            />
            <RNDateTimePicker
              value={data.incidentDate}
              mode="date"
              placeholder={"Incident Date"}
              onPress={(val) => setData({ ...data, incidentDate: val })}
            />
            {locations !== null && (
              <RNDropDownPicker
                providedData={dataForLocationDropDown()}
                placeholder={"Location"}
                getValue={(newValue) =>
                  setData({
                    ...data,
                    location: {
                      latitude: newValue.locationAddress.latitude,
                      longitude: newValue.locationAddress.longitude,
                    },
                  })
                }
              />
            )}
            <TextField
              placeholder={"Location Details"}
              value={data.userId}
              onTextChange={(newText) =>
                handleTextChange("locationDetails", newText)
              }
            />
            <TextField
              placeholder={"Narrative"}
              value={data.userId}
              onTextChange={(newText) => handleTextChange("narrative", newText)}
            />
            <View style={styles.fileUploadCont}>
              <View style={{ width: "40%" }}>
                {imagePreview?.length ? (
                  <ScrollView
                    style={{
                      width: "100%",
                    }}
                    horizontal={true}
                  >
                    {imagePreview?.map((img, i) => (
                      <Image
                        key={i}
                        style={{ height: "100%", width: 150 }}
                        source={{ uri: img }}
                      />
                    ))}
                  </ScrollView>
                ) : (
                  <Image
                    style={{ height: "100%", width: "100%" }}
                    source={placeholder}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: "column",
                  marginLeft: 10,
                  width: "40%",
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  Upload Image
                </Text>
                <View style={{ marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={handleImage}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: COLORS.primary,
                    }}
                  >
                    <Text style={{ alignSelf: "center" }}>Choose File</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* BUTTON  */}

        <Pressable style={styles.btnContainer} onPress={handleSubmit}>
          <Text style={styles.btnText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default IncidentReporting;

// const [name, setName] = React.useState("")
//     const [userId, setUserId] = React.useState("")
//     const [subject, setSubject] = React.useState("")
//     const [message, setMessage] = React.useState("")
