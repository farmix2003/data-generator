/* eslint-disable no-case-declarations */
import { useState } from "react";
import seedrandom from "seedrandom";
import { faker } from "@faker-js/faker";
import { fakerEN_US as fakerUSA } from "@faker-js/faker";
import { fakerEN_GB as fakerUK } from "@faker-js/faker";
import { fakerPL as fakerPL } from "@faker-js/faker";
import { fakerTR as fakerTr } from "@faker-js/faker";
import RegionSelection from "./components/RegionSelection";
import ErrorRateControls from "./components/ErrorRateControl";
import SeedValueInput from "./components/SendValueInput";
import RandomButton from "./components/RandomButton";
import UserDataTable from "./components/UserDataTable";

const App = () => {
  const [selectedRegion, setSelectedRegion] = useState("USA");
  const [errorRate, setErrorRate] = useState(0);
  const [seedValue, setSeedValue] = useState("");
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleSliderChange = (event) => {
    setErrorRate(parseInt(event.target.value));
  };

  const handleInputChange = (event) => {
    setErrorRate(parseInt(event.target.value));
  };

  const handleSeedChange = (event) => {
    setSeedValue(event.target.value);
  };

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1000000);
    setSeedValue(randomSeed.toString());
  };

  const applyError = (str) => {
    const errorTypes = ["delete", "add", "swap"];
    const randomErrorType =
      errorTypes[Math.floor(Math.random() * errorTypes.length)];

    switch (randomErrorType) {
      case "delete":
        const deleteIndex = Math.floor(Math.random() * str.length);
        return str.slice(0, deleteIndex) + str.slice(deleteIndex + 1);
      case "add":
        const addIndex = Math.floor(Math.random() * (str.length + 1));
        const randomChar = String.fromCharCode(
          Math.floor(Math.random() * 26) + 97
        );
        return str.slice(0, addIndex) + randomChar + str.slice(addIndex);
      case "swap":
        const swapIndex = Math.floor(Math.random() * (str.length - 1));
        return (
          str.slice(0, swapIndex) +
          str[swapIndex + 1] +
          str[swapIndex] +
          str.slice(swapIndex + 2)
        );
      default:
        return str;
    }
  };

  const generateRandomData = (seed, page) => {
    const rng = seedrandom(seed + page);

    const regionData = {
      USA: {
        generateRandomFullName: () => fakerUSA.person.fullName(),
        getRandomCity: () => fakerUSA.location.city(),
        getRandomAddress: () => fakerUSA.location.streetAddress(),
        getRandomPhone: () => faker.phone.number(),
      },
      Turkey: {
        generateRandomFullName: () => fakerTr.person.fullName(),
        getRandomCity: () => fakerTr.location.city(),
        getRandomAddress: () => fakerTr.location.streetAddress(),
        getRandomPhone: () => fakerTr.phone.number(),
      },
      UK: {
        generateRandomFullName: () => fakerUK.person.fullName(),
        getRandomCity: () => fakerUK.location.city(),
        getRandomAddress: () => fakerUK.location.streetAddress(),
        getRandomPhone: () => fakerUK.phone.number(),
      },
      Poland: {
        generateRandomFullName: () => fakerPL.person.fullName(),
        getRandomCity: () => fakerPL.location.city(),
        getRandomAddress: () => fakerPL.location.streetAddress(),
        getRandomPhone: () => fakerPL.phone.number(),
      },
    };

    const regionDataForSelectedRegion = regionData[selectedRegion];

    const generateRandomIdentifier = () => {
      return Math.random().toString(36).substring(2);
    };

    const newData = [];
    const itemsPerPage = 20;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    for (let i = startIndex; i < endIndex; i++) {
      rng();
      const randomIdentifier = generateRandomIdentifier();
      const randomFullName =
        regionDataForSelectedRegion.generateRandomFullName();
      const randomCity = regionDataForSelectedRegion.getRandomCity();
      const randomAddress = regionDataForSelectedRegion.getRandomAddress();
      const randomPhone = regionDataForSelectedRegion.getRandomPhone();

      const applyErrorToField = (field) => {
        return Math.random() < errorRate ? applyError(field) : field;
      };

      const record = {
        randomIdentifier: randomIdentifier,
        fullName: applyErrorToField(randomFullName),
        city: applyErrorToField(randomCity),
        address: applyErrorToField(randomAddress),
        phone: applyErrorToField(randomPhone),
      };
      newData.push(record);
    }
    return newData;
  };

  const handleRandomGeneration = () => {
    const seed = seedValue + window.location.pathname;
    const newData = generateRandomData(seed, 1);
    setUserData(newData);
    setCurrentPage(1);
  };

  const regions = ["USA", "Turkey", "UK", "Poland"];

  return (
    <div className="">
      <div className=" mt-20 ml-[5%] w-[90%] flex flex-col justify-between gap-10">
        <div className="flex flex-col gap-5 w-[70%] justify-start items-start ">
          <RegionSelection
            regions={regions}
            selectedRegion={selectedRegion}
            handleRegionChange={handleRegionChange}
          />
          <ErrorRateControls
            errorRate={errorRate}
            handleSliderChange={handleSliderChange}
            handleInputChange={handleInputChange}
          />
          <SeedValueInput
            seedValue={seedValue}
            handleSeedChange={handleSeedChange}
            handleRandomSeed={handleRandomSeed}
          />
          <RandomButton handleRandomGeneration={handleRandomGeneration} />
        </div>
        <UserDataTable userData={userData} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default App;
