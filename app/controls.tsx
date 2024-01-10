import { Dispatch, SetStateAction, useState } from 'react'
import Select from "react-select";
import { User } from "./types/user";

interface IControls{
  users: User[]
  setUsersList: Dispatch<SetStateAction<User[]>>
}
interface UserSortOption {
  label: string;
  value: keyof User;
}
interface UserSorting {
  label: string;
  value: 'asc' | 'desc';
}

const fieldOptions:UserSortOption[] = [
  { label: "Name", value: "name" },
  { label: "Company", value: "company" },
  { label: "Email", value: "email" },
];

const directionOptions = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
];

const Controls = ({ users, setUsersList } : IControls) => {
  const [sortOption, setSortOption] = useState<UserSortOption | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortUsers = (field: string, direction: 'asc' | 'desc') => {
    const sorted = [...users].sort((a, b) => {
      const valueA = (a as any)[field];
      const valueB = (b as any)[field];

      if (field === 'company') {
        return direction === 'asc'
          ? valueA.name.localeCompare(valueB.name)
          : valueB.name.localeCompare(valueA.name);
      }

      return direction === 'asc'
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

    setUsersList(sorted);
  };


  const handleSortChange = (selectedOption: UserSortOption | null) => {
    setSortOption(selectedOption);

    if (selectedOption) {
      sortUsers(selectedOption.value, sortDirection);
    }
  };

  const handleDirectionChange = (selectedOption: UserSorting) => {
    setSortDirection(selectedOption.value);

    if (sortOption) {
      sortUsers(sortOption.value, selectedOption.value);
    }
  };

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select
          options={fieldOptions}
          value={sortOption}
          inputId="sort-field" className="input"
          onChange={handleSortChange}
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          value={directionOptions.find((option) => option.value === sortDirection)}
          onChange={(data) => handleDirectionChange(data as UserSorting)}
          inputId="sort-direction"
          className="input"
        />
      </div>
    </div>
  );
};

export default Controls;
