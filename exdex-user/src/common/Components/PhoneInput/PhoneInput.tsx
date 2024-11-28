import React, { useEffect, useState } from "react";
import classes from "./PhoneInput.module.scss";
import { useSelector } from "react-redux";
import { selectCountryCodes } from "../../../store/authSlice";

interface PhoneInputProps {
  updatePhone: ({ code, phone }: any) => void;
}

const PhoneInputComponent: React.FC<PhoneInputProps> = ({ updatePhone }) => {
  const countries = useSelector(selectCountryCodes);
  const [selectedCountry, setSelectedCountry] = useState<any>();
  const [phoneNumber, setPhoneNumber] = useState<string>("");

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

  return (
    <div className={classes.phoneWrapper}>
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
