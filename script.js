// store votes in an array 
let votes =[];
// available options (predefined)

const options = ["yes", "no", "maybe"];

// Function to handle voting
function vote(choice){
    votes.push(choice);
    console.log(votes);
    updateResults();
    updateVoteList();
}

// function to count votes using for.of and return two arrays
function countVotes(votesArray){
    // create parallel arrays
    const voteOptions=[] //Array of option names
    const voteCounts=[] //Array of counts
    // loop through each vote using for..of
    for(let currentVotes of votesArray){
        // check if this option already exists
        let foundIndex = -1;
        let index = 0;
        // search through options array
        for(let options of voteOptions){
            if(options === currentVotes){
                foundIndex = index;
                break;
            }
            index++;
        }
        // if found, increment count at that index
        if(foundIndex !== -1){
            voteCounts[foundIndex]++;
        }else{
            // if not found, add to both arrays
            voteOptions.push(currentVotes);
            voteCounts.push(1);
            
        }
    }
    // return both arrays
    return [voteOptions, voteCounts];
}

// function to calculate total votes using for...of
function getTotalVotes(votesArray){
    let total = 0;
    for(let vote of votesArray){
        total++;
    }
    return total;
}

// function to calculate percentage of each option
function getPercentage(option, votesArray){
    let total =0;
    let optionCount =0;
    for(let vote of votesArray){
        total++;
        if(vote ===option){
            optionCount++;
        }
    }

    if(total === 0){
        return 0;
    }
    return ((optionCount / total) * 100).toFixed(1);
}



// function to update the result in display using for...of with array
function updateResults(){
    let resultDiv = document.getElementById('result');
    // to check whether array is empty or not
    if(votes.length === 0){
        resultDiv.innerHTML = `
                    <h2> Results </h2>
                    <p class="no-votes"> No votes yet. Cast your vote!</p>
        
        `;
        return;
    }

    // get two seperate arrays
    const[voteOptions, voteCounts] = countVotes(votes);
    console.log(voteOptions)
     console.log(voteCounts)
    let html = `<h2> Results </h2>`;
    let index = 0;
    // loop through options array using for..of
    for(let option of voteOptions){
        const count = voteCounts[index]; //get count from parallel array
        console.log("counting yes/no/maybe", count);
        const percentage = getPercentage(option, votes);
    
    html += `
        <div class="result-item">
            <span class="result-label">${option} (${percentage}%) </span>
            <span class="result-count">${count}</span>
        </div>
    `;
     index++
    }
    // call getTotalVotes(array-votes)
    const totalVotes = getTotalVotes(votes);
    console.log(totalVotes);

    html += `<p class="total-votes"> Total Votes: ${totalVotes}</p>`

    resultDiv.innerHTML = html
}

// function to dicplay vote history
function updateVoteList(){
    const voteListDiv = document.getElementById('voteList');
    const voteItemsDiv = document.getElementById('voteItems');
    if(votes.length === 0){
        voteListDiv.style.display = 'none';
        return;
    }

    voteListDiv.style.display = "block";
    let html='';
    let count =0;
    // loop through votes
    for(let vote of votes){
        count++;
        html += `<span class="vote-item"> ${count}: ${vote} </span>`;
    }
    voteItemsDiv.innerHTML = html;
}

// function to reset votes
function resetVotes(){
    votes = [];
    updateResults();
    updateVoteList();
}