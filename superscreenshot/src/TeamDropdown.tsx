import React from 'react';

interface ITeamDropdownProps {
    onTeamChange: (teamName: string) => void
}

const TeamDropdown = React.memo<ITeamDropdownProps>((props: ITeamDropdownProps) => {
    return (
        <select onChange={(event : React.ChangeEvent<HTMLSelectElement>) => props.onTeamChange(event.target.value)}>
            <option value="">--Please choose an option--</option>
            <option value="seahawks">Seahawks</option>
            <option value="falcons">Falcons</option>
        </select>
    )
});

export default TeamDropdown;