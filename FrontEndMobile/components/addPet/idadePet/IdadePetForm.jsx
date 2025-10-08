import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

const PICKER_WIDTH = 280;
const ITEM_WIDTH = 56;

export default function IdadePetForm({ anos, setAnos, meses, setMeses }) {
  const anosArray = [...Array(21).keys()];
  const mesesArray = [...Array(12).keys()];

  const ScrollPicker = ({ data, value, onChange }) => {
    const flatListRef = useRef(null);
    const [currentScrollOffset, setCurrentScrollOffset] = useState(0);
    const centerOffset = PICKER_WIDTH / 2 - ITEM_WIDTH / 2;

    const getCurrentCenterIndex = (offset) => {
      return Math.round(offset / ITEM_WIDTH);
    };

    const handleScroll = (event) => {
      setCurrentScrollOffset(event.nativeEvent.contentOffset.x);
    };

    const handleMomentumScrollEnd = (event) => {
      const offset = event.nativeEvent.contentOffset.x;
      const finalIndex = getCurrentCenterIndex(offset);

      if (finalIndex >= 0 && finalIndex < data.length) {
        onChange(data[finalIndex]);
      }
    };

    useEffect(() => {
      const index = data.indexOf(value);
      if (flatListRef.current && index !== -1) {
        flatListRef.current.scrollToOffset({
          offset: index * ITEM_WIDTH,
          animated: false,
        });
        setCurrentScrollOffset(index * ITEM_WIDTH);
      }
    }, [data, value]);

    const centerIndex = getCurrentCenterIndex(currentScrollOffset);

    return (
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollPicker}
        keyExtractor={(item) => item.toString()}

        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"

        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}

        contentContainerStyle={{ paddingHorizontal: centerOffset }}
        extraData={centerIndex}

        renderItem={({ item, index }) => {
          const isSelected = index === centerIndex;

          const itemCenterPosition = index * ITEM_WIDTH + ITEM_WIDTH / 2;
          const viewCenterPosition = currentScrollOffset + PICKER_WIDTH / 2;
          const distance = Math.abs(itemCenterPosition - viewCenterPosition);

          const maxDistance = PICKER_WIDTH / 2;
          const clampedDistance = Math.min(1, Math.max(0, distance / maxDistance));

          const opacity = isSelected ? 1 : 1 - clampedDistance * 0.7;

          return (
            <Pressable style={styles.scrollItem}>
              <Text
                style={[
                  styles.scrollText,
                  { opacity: opacity },
                  isSelected && styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        }}
      />
    );
  };

  return (
    <View style={styles.form}>

      <View style={[styles.pickerWrapper, styles.pickerWrapperYears]}>
        {Platform.OS === "ios" ? (
          <View style={styles.pickerContainerIOS}>
            <Picker
              selectedValue={anos}
              style={styles.picker}
              onValueChange={(value) => setAnos(value)}
            >
              {anosArray.map((n) => (
                <Picker.Item key={n} label={n.toString()} value={n} />
              ))}
            </Picker>
          </View>
        ) : (
          <View style={styles.pickerContainer}>
            <ScrollPicker data={anosArray} value={anos} onChange={setAnos} />
          </View>
        )}
        <Text style={styles.label}>anos</Text>
      </View>

      <View style={styles.pickerWrapper}>
        {Platform.OS === "ios" ? (
          <View style={styles.pickerContainerIOS}>
            <Picker
              selectedValue={meses}
              style={styles.picker}
              onValueChange={(value) => setMeses(value)}
            >
              {mesesArray.map((n) => (
                <Picker.Item key={n} label={n.toString()} value={n} />
              ))}
            </Picker>
          </View>
        ) : (
          <View style={styles.pickerContainer}>
            <ScrollPicker data={mesesArray} value={meses} onChange={setMeses} />
          </View>
        )}
        <Text style={styles.label}>meses</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    marginTop: 30,
  },
  pickerWrapper: {
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
    paddingBottom: 10,
    width: 280,
  },
  pickerWrapperYears: {
    borderTopWidth: 1,
    borderTopColor: "#C4C4C4",
    paddingTop: 10,
  },
  pickerContainer: {
    width: 280,
    height: 70,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "transparent",
  },
  pickerContainerIOS: {
    width: 280,
    height: 70,
    overflow: "hidden",
  },
  picker: {
    width: 280,
    height: 70,
  },
  scrollPicker: {
    width: 280,
    height: 70,
    backgroundColor: "transparent",
  },
  scrollItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 56,
    height: 70,
  },
  scrollText: {
    fontSize: 32,
    color: "#555",
    fontWeight: "500",
  },
  selectedText: {
    color: "#2F8B88",
    fontWeight: "bold",
  },
  label: {
    color: "#2F8B88",
    fontSize: 15,
    fontWeight: "regular",
  },
});