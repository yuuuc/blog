import React from 'react';

function Search(props: any) {
	const { search, setSearch } = props;
	return (
		<>
			<input
				type='text'
				onChange={(e) => {
					setSearch(e.target.value);
				}}
				value={search}
			/>
			<ShowClear search={search} setSearch={setSearch}></ShowClear>
		</>
	);
}

function ShowClear(props: any) {
	const { search, setSearch } = props;

	if (search && search.length > 0) {
		console.log(123);

		return (
			<>
				<span
					className='clear'
					onClick={() => {
						setSearch('');
					}}
				></span>
			</>
		);
	} else {
		return <></>;
	}
}

export default Search;
