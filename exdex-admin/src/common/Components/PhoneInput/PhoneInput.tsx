import React, { useEffect, useState } from "react";
import classes from "./PhoneInput.module.scss";
import { useSelector } from "react-redux";
import { selectCountryCodes } from "../../../store/authSlice";

interface PhoneInputProps {
  updatePhone: ({ code, phone }: any) => void;
  theme?: string;
  initialPhone?: string;
  initialCode?: string;
}

const PhoneInputComponent: React.FC<PhoneInputProps> = ({
  updatePhone,
  theme,
  initialPhone,
  initialCode,
}) => {
  const countries = useSelector(selectCountryCodes);
  const [selectedCountry, setSelectedCountry] = useState<any>({ code: "" });
  const [phoneNumber, setPhoneNumber] = useState<any>("");

  useEffect(() => {
    setSelectedCountry({
      code: initialCode,
    });
    setPhoneNumber(initialPhone);
  }, [initialPhone, initialCode]);

  useEffect(() => {
    updatePhone({ code: selectedCountry, phone: phoneNumber });
  }, [selectedCountry, phoneNumber]);

  useEffect(() => {
    if (countries && countries.length) {
      const setDefaultCountry = async () => {
        const userCountryCode = await fetchUserCountry();
        const defaultCountry = countries.find(
          (c) => c.code === userCountryCode
        );
        setSelectedCountry(defaultCountry || countries[0]); // Fallback to first country if userCountryCode is not found
      };

      setDefaultCountry();
    }
  }, [countries]);


  const fetchUserCountry = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      return data.country_code;
    } catch (error) {
      console.error("Error fetching user's country:", error);
      return null;
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const country = countries.find((c) => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  useEffect(() => {
    if (initialCode && countries && countries.length) {
      const initialCountry = countries.find((c) => c.dial_code === initialCode);
      if (initialCountry) {
        setSelectedCountry(initialCountry);
      }
    }
    if (initialPhone) {
      setPhoneNumber(initialPhone);
    }
  }, [initialPhone, initialCode, countries]);

  // useEffect(() => {
  //   if (countries && countries.length) {
  //     setSelectedCountry(countries[0]);
  //   }
  // }, [countries]);

  return (
    <div className={`${classes.phoneWrapper} ${theme && classes[theme]}`}>
      <select value={selectedCountry?.code} onChange={handleCountryChange}>
        {countries &&
          countries.length > 0 &&
          countries.map((country) => (
            <option key={country?.code} value={country?.code}>
              {country?.flag} {country?.dial_code}
            </option>
          ))}
      </select>
      <input
        type="tel"
        placeholder="Phone"
        autoComplete="off"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
    </div>
  );
};

export default PhoneInputComponent;
