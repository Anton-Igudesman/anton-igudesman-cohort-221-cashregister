function checkCashRegister(price, cash, cid) {
    let change = Math.round((cash - price) * 100) / 100;
    
    const drawer = {
      status: "",
      change: []
    };
  
    const denominations = [
      {denom: "ONE HUNDRED", value: 100},
      {denom: "TWENTY", value: 20},
      {denom: "TEN", value: 10},
      {denom: "FIVE", value: 5},
      {denom: "ONE", value: 1},
      {denom: "QUARTER", value: 0.25},
      {denom: "DIME", value: 0.10},
      {denom: "NICKEL", value: 0.05},
      {denom: "PENNY", value: 0.01}
    ];
  
    let sumInDrawer = 0;
    cid.forEach(value => {
      sumInDrawer = Math.round((sumInDrawer += value[1]) * 100) / 100;
  })
  
    if (change > sumInDrawer) {
      drawer.status = "INSUFFICIENT_FUNDS";
      return drawer;
    } else if (change === sumInDrawer) {
      drawer.status = "CLOSED";
      drawer.change = [...cid];
      return drawer;
    }
  
    cid = cid.reverse();
  
    const result = denominations.reduce((acc, curr, index) => {
      if (change >= curr.value) {
        let totalChange = 0;
        while (change >= curr.value && cid[index][1] >= curr.value) {
          totalChange = Math.round((totalChange += curr.value) * 100) / 100;
  
          change = Math.round((change -= curr.value) * 100) / 100;
          cid[index][1] = Math.round((cid[index][1] -= curr.value) * 100) / 100;
  
        }
  
         acc.push([curr.denom, totalChange])
         console.log(acc)
          return acc 
      } else {
        return acc
      }
  
  
    }, []);
      if (result.length > 0 && change === 0) {
        return {status: "OPEN", change: result};
      } else {
        return {status: "INSUFFICIENT_FUNDS", change: []}
      }
  
  }
  
  console.log(
    checkCashRegister(21.23, 42.97, [
        ["PENNY", 1.01], 
        ["NICKEL", 2.05], 
        ["DIME", 3.1], 
        ["QUARTER", 4.25], 
        ["ONE", 90], 
        ["FIVE", 55], 
        ["TEN", 20], 
        ["TWENTY", 60], 
        ["ONE HUNDRED", 100]
    ]));