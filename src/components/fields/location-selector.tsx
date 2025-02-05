"use client"

import { useState, useEffect, useMemo } from "react"
import { Country, State, City } from "country-state-city"
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command"
import { Label } from "@/components/ui/label"

interface Location {
  country: string
  state: string
  city: string
}

interface CountryItem {
  isoCode: string
  name: string
}

interface StateItem {
  isoCode: string
  name: string
}

interface CityItem {
  name: string
}

type LocationItem = CountryItem | StateItem | CityItem

interface LocationSelectorProps {
  onSelect: (location: Location) => void
}

export default function LocationSelector({ onSelect }: LocationSelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [countrySearch, setCountrySearch] = useState("")
  const [stateSearch, setStateSearch] = useState("")
  const [citySearch, setCitySearch] = useState("")

  const countries = useMemo<CountryItem[]>(() => Country.getAllCountries(), [])
  const states = useMemo<StateItem[]>(
    () => (selectedCountry ? State.getStatesOfCountry(selectedCountry) : []),
    [selectedCountry],
  )
  const cities = useMemo<CityItem[]>(
    () => (selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : []),
    [selectedCountry, selectedState],
  )

  const filteredCountries = useMemo(
    () => countries.filter((country) => country.name.toLowerCase().includes(countrySearch.toLowerCase())),
    [countries, countrySearch],
  )

  const filteredStates = useMemo(
    () => states.filter((state) => state.name.toLowerCase().includes(stateSearch.toLowerCase())),
    [states, stateSearch],
  )

  const filteredCities = useMemo(
    () => cities.filter((city) => city.name.toLowerCase().includes(citySearch.toLowerCase())),
    [cities, citySearch],
  )

  useEffect(() => {
    onSelect({ country: selectedCountry, state: selectedState, city: selectedCity })
  }, [selectedCountry, selectedState, selectedCity, onSelect])

  return (
    <div className="space-y-4">
      <LocationField<CountryItem>
        label="Country"
        placeholder="Search country..."
        items={filteredCountries}
        onSearch={setCountrySearch}
        onSelect={(country) => {
          setSelectedCountry(country.isoCode)
          setSelectedState("")
          setSelectedCity("")
        }}
        disabled={false}
      />
      <LocationField<StateItem>
        label="State"
        placeholder="Search state..."
        items={filteredStates}
        onSearch={setStateSearch}
        onSelect={(state) => {
          setSelectedState(state.isoCode)
          setSelectedCity("")
        }}
        disabled={!selectedCountry}
      />
      <LocationField<CityItem>
        label="City"
        placeholder="Search city..."
        items={filteredCities}
        onSearch={setCitySearch}
        onSelect={(city) => setSelectedCity(city.name)}
        disabled={!selectedState}
      />
    </div>
  )
}

interface LocationFieldProps<T extends LocationItem> {
  label: string
  placeholder: string
  items: T[]
  onSearch: (value: string) => void
  onSelect: (item: T) => void
  disabled: boolean
}

function LocationField<T extends LocationItem>({
  label,
  placeholder,
  items,
  onSearch,
  onSelect,
  disabled,
}: LocationFieldProps<T>) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <Command className="rounded-lg border border-gray-300 shadow-sm">
        <CommandInput placeholder={placeholder} onValueChange={onSearch} disabled={disabled} className="py-3" />
        <CommandList className="max-h-48 overflow-y-auto">
          <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
          {items.map((item) => (
            <CommandItem
              key={"isoCode" in item ? item.isoCode : item.name}
              onSelect={() => onSelect(item)}
              className="cursor-pointer hover:bg-gray-100 py-2"
            >
              {item.name}
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  )
}

