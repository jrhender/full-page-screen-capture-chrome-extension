import React from 'react';

interface ITeamDropdownProps {
    onTeamChange: (teamName: string) => void,
    selectedTeam: string
}

const TeamDropdown = React.memo<ITeamDropdownProps>((props: ITeamDropdownProps) => {
    return (
        <select onChange={(event : React.ChangeEvent<HTMLSelectElement>) => props.onTeamChange(event.target.value)} value={props.selectedTeam}>
            <option value="">--Please choose an option--</option>
            <option value="cardinals">Arizona Cardinals</option>
            <option value="falcons">Atlanta Falcons</option>
            <option value="ravens">Baltimore Ravens</option>
            <option value="bills">Buffalo Bills</option>
            <option value="panthers">Carolina Panthers</option>
            <option value="bears">Chicago Bears</option>
            <option value="bengals">Cincinnati Bengals</option>
            <option value="browns">Cleveland Browns</option>
            <option value="cowboys">Dallas Cowboys</option>
            <option value="broncos">Denver Broncos</option>
            <option value="lions">Detroit Lions</option>
            <option value="packers">Green Bay Packers</option>
            <option value="texans">Houston Texans</option>
            <option value="colts">Indianapolis Colts</option>
            <option value="jaguars">Jacksonville Jaguars</option>
            <option value="chiefs">Kansas City Chiefs</option>
            <option value="dolphins">Miami Dolphins</option>
            <option value="vikings">Minnesota Vikings</option>
            <option value="patriots">New England Patriots</option>
            <option value="saints">New Orleans Saints</option>
            <option value="giants">New York Giants</option>
            <option value="jets">New York Jets</option>
            <option value="raiders">Oakland Raiders</option>
            <option value="eagles">Philadelphia Eagles</option>
            <option value="steelers">Pittsburgh Steelers</option>
            <option value="rams">St. Louis Rams</option>
            <option value="chargers">San Diego Chargers</option>
            <option value="49ers">San Francisco 49ers</option>
            <option value="seahawks">Seattle Seahawks</option>
            <option value="buccaneers">Tampa Bay Buccaneers</option>
            <option value="titans">Tennessee Titans</option>
            <option value="redskins">Washington Redskins</option>
        </select>
    )
});

export default TeamDropdown;