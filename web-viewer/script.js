
function calculate_rep(data){

	// factions = [
	// 	{"Stormwind" : 0},
	// 	{"ironforge" : 0}
	// ]

	let factions = [];
	let faction_names = [];

	data.forEach(function(point){
		quest_reps = point['data']['reputations']

		if(quest_reps.length > 0){
			
			quest_reps.forEach(function(rep){

				if( !faction_names.includes(rep['faction']) ){
					faction_names.push(rep['faction']);
					faction_object = {"name": rep['faction'], "total_rep": 0};
					factions.push(faction_object);
				};

				factions.find(x => x.name === rep['faction'])['total_rep'] += parseInt(rep['amount'])

			});

		};

	});

	return factions;

}

function calc_faction_exp(data){

	let factions = [];
	let faction_names = [];

	data.forEach(function(point){

		q = point['data'];

		quest_exp = q['experience'];
		faction = q['faction'];

		if(faction.includes('http://classicdb.ch/?object=176143')){
			console.log(q);
		}

		if (!faction_names.includes(faction)){
			faction_names.push(faction);
			faction_obj = {'name' : faction, 'total_exp': 0};
			factions.push(faction_obj);
		};

		factions.find(x => x.name === faction)['total_exp'] += parseInt(quest_exp);

	})

	return factions;

}

// Takes an object array and sorts by a key
function order_by(data_set, field, order='ascend'){

	function compare_asc( a,b ){
		if (a[field] < b[field]){
			return -1;
		}
		if (a[field] > b[field]){
			return 1;
		}
		return 0;
	}

	function compare_dsc( a,b ){
		if (a[field] < b[field]){
			return 1;
		}
		if (a[field] > b[field]){
			return -1;
		}
		return 0;
	}

	if (order === 'descend') {
		return data_set.sort( compare_dsc )
	}

	// Default: ascending order
	return data_set.sort( compare_asc );
 

	

}

function init(){

	const d = quest_data['data'];

	console.log('Faction Rep');
	console.log(order_by(calculate_rep(d), 'total_rep', 'descend'));

	console.log('Faction Exp');
	console.log(order_by(calc_faction_exp(d), 'name'));
}
