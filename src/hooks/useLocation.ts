import { State, City } from "country-state-city";

const useLocation = () => {
    const getStateByCode = (stateCode: string) => {
        const state = State.getAllStates().find(
            (state) =>
                state.countryCode === "IN" && state.isoCode === stateCode
        );

        if (!state) return null;

        return state;
    };

    const getCountryStates = () => {
        return State.getAllStates().filter(
            (state) => state.countryCode === "IN"
        );
    };

    const getStateCities = (stateCode: string) => {
        return City.getAllCities().filter(
            (city) => city.countryCode === "IN" && city.stateCode === stateCode
        );
    };

    return {
        getStateByCode,
        getCountryStates,
        getStateCities
    };
};


export default useLocation;