import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  ReactNode,
} from "react";

// Define the TradingSettings interface
export interface TradingSettings {
  riskType: string;
  leverage: string;
  timeframe: string;
  exchange: string;
  activatedPair: string;
  position: string;
  isShortActive: boolean;
  isLongActive: boolean;
  card_type: string;
  itemsPerPage: number;
  currentPage: number;
  isFetchMore : boolean;
  search : string
}

// Define the context interface that includes state and updater function
interface FilterContextType {
  filterState: TradingSettings;
  setFilterState: (updates: Partial<TradingSettings>) => void;
  resetFilters: () => void;
}

export const initialFilterData = {
  riskType: "",
  leverage: "",
  timeframe: "",
  exchange: "",
  activatedPair: "btc",
  position: "",
  isShortActive: false,
  isLongActive: false,
  toggleFilterBtn: false,
  isFetchMore : false
};

// Create the context with default values
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Define the provider component
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filterState, setFilterStateInternal] = useState<TradingSettings>({
    ...initialFilterData,
    itemsPerPage: 12,
    currentPage: 1,
    card_type: "Spot market",
    search :""
  });

  // Memoize the context value to avoid unnecessary re-renders
  const setFilterState = (updates: Partial<TradingSettings>) => {
    setFilterStateInternal((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const resetFilters = (props? :TradingSettings ) => {
    setFilterStateInternal((prevState) => ({
      ...prevState,
      ...initialFilterData,
      ...(props ? {props} : {})
    }));
  };

  const contextValue = useMemo(
    () => ({ filterState, setFilterState, resetFilters }),
    [filterState]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
