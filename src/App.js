import React from 'react';
import Board from './components/Board';
import SGF from './components/SGF';
import Measurements from './components/Measurements';

const number2letter = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t"]

class App extends React.Component {
	constructor(props) {
		super(props);
		this.clickOnCell = this.clickOnCell.bind(this);
		this.setShowText = this.setShowText.bind(this)
		this.addSGFGame2 = this.addSGFGame2.bind(this)
		this.advanceCursor = this.advanceCursor.bind(this)
		this.decrementCursor = this.decrementCursor.bind(this)
		this.clearTheBoard = this.clearTheBoard.bind(this)
		this.doNextTurn = this.doNextTurn.bind(this)
		this.black = "B"
		this.white = "W"
		this.turn = this.black
		let board = []
		this.turnCount = 0 
		for (let col = 0; col < 19; col++) {
			board[col] = []
			for (let row = 0; row < 19; row++) {
				board[col][row] = {
					black: 0,
					white: 0,
					col: col,
					row: row,
					owner: this.nill,
					turnCount:-1
				}
			}
		}
		this.state = {
			board: board,
			showText:true,
			game:[],
			cursor:0,
			currentStoneRow:-1,
			currentStoneColumn:-1

		}
	}

	advanceCursor() { 
		let x = this.state.cursor
		x++
		if ( x > ( this.turn - 1 )) { 
			x = this.turn - 1
		} 
		this.setState({cursor:x})
	}
	decrementCursor() {
		let x = this.state.cursor
		x--
		if ( x < 0 ) {
			x = 0
		}
		this.setState({cursor:x})

	}

	setShowText() { 
		let x = this.state.showText
		if ( x === false ) {
			x = true 
		} else {
			x = false
		}
		this.setState({showText:x})
	}
	clearTheBoard() { 
		this.turn = 0 
		let board = this.state.board
		board.forEach((row)=>{
			row.forEach((item)=>{
				item.owner = this.nill; 
				item.turnCount = -1;
				item.black = 0;
				item.white = 0;
			});
		});
		this.setState({board:board})
		this.setState({cursor:0})
		this.turnCount = 0 

		this.setState({"game":[]})
		this.setState({"cursor":0})
	}	
	addSGFGame2() {
		this.clearTheBoard() 
		/// Uhg! I want this method to be in SGF.js but I do not know how to get information from that into 'App.js' this.state...
		/// TODO: Ask Mark/Sparky
		const selectObj = document.getElementById("datasetSelector")
		const key = selectObj.options[selectObj.selectedIndex].text
	
		let historyMap = {} 
		historyMap["022.sgf"]={"dt":"DT[1667-12-05]","file":"022.sgf","re":"RE[W+5]","moves":";B[cp];W[eq];B[hq];W[oq];B[qo];W[qq];B[ql];W[dc];B[ce];W[cl];B[do];W[ci];B[fp];W[qd];B[oc];W[kc];B[ed];W[dd];B[de];W[ee];B[fd];W[ef];B[bc];W[fb];B[hd];W[bb];B[dg];W[fg];B[ch];W[di];B[eh];W[gh];B[ei];W[jf];B[hg];W[ig];B[ie];W[hh];B[kd];W[ld];B[ke];W[jc];B[ic];W[bh];B[bg];W[dh];B[eg];W[ge];B[eb];W[db];B[ec];W[ea];B[gd];W[bd];B[be];W[ac];B[cg];W[bi];B[ek];W[el];B[fl];W[em];B[dk];W[fj];B[ej];W[cn];B[bj];W[fm];B[bk];W[cq];B[bq];W[br];B[dq];W[cr];B[dr];W[bp];B[bo];W[ep];B[dp];W[eo];B[er];W[fq];B[ap];W[nd];B[lc];W[mc];B[lb];W[mb];B[le];W[md];B[qc];W[pd];B[rd];W[pc];B[rb];W[qb];B[rc];W[kg];B[mf];W[mh];B[ng];W[pb];B[qf];W[qe];B[re];W[pf];B[qg];W[pg];B[nh];W[qh];B[rh];W[ni];B[oh];W[ph];B[oi];W[ri];B[rg];W[pk];B[mi];W[pl];B[nj];W[qm];B[gl];W[ho];B[hf];W[ik];B[il];W[jl];B[im];W[hk];B[gm];W[iq];B[gq];W[fr];B[jk];W[jj];B[kk];W[ip];B[gn];W[fo];B[mq];W[kj];B[kq];W[jr];B[jo];W[io];B[pp];W[pq];B[no];W[jn];B[lo];W[np];B[op];W[nq];B[kn];W[mo];B[mn];W[oo];B[mp];W[on];B[qj];W[qk];B[rj];W[pj];B[qi];W[pi];B[rk];W[rl];B[gg];W[fh];B[ff];W[lk];B[kl];W[ll];B[jm];W[li];B[lh];W[kh];B[kr];W[hr];B[ib];W[kb];B[nr];W[or];B[mr]"};
		historyMap["035.sgf"]={"dt":"DT[1668-11-24]","file":"035.sgf","re":"RE[B+10]","moves":";B[qe];W[dc];B[ce];W[ch];B[co];W[pq];B[qo];W[qj];B[dq];W[od];B[hc];W[ed];B[kc];W[qc];B[qh];W[qm];B[mq];W[op];B[jq];W[pn];B[cj];W[df];B[ej];W[lp];B[lq];W[ip];B[jp];W[io];B[jo];W[in];B[hr];W[jn];B[bg];W[cg];B[bc];W[bf];B[be];W[cf];B[cb];W[he];B[ke];W[db];B[ae];W[dn];B[do];W[dl];B[nb];W[re];B[rf];W[rd];B[pf];W[ob];B[nc];W[oc];B[de];W[ee];B[fg];W[fh];B[gh];W[fi];B[ef];W[hd];B[eh];W[ei];B[gf];W[eg];B[dg];W[dh];B[eg];W[hg];B[gg];W[di];B[gc];W[gd];B[fc];W[fd];B[jh];W[jd];B[jc];W[jg];B[gi];W[ih];B[ii];W[kh];B[ji];W[lg];B[fj];W[dj];B[dk];W[ck];B[ek];W[el];B[cl];W[bk];B[gk];W[bl];B[cm];W[bj];B[lj];W[ln];B[oi];W[me];B[pk];W[qk];B[pl];W[ql];B[en];W[nk];B[ml];W[ni];B[nl];W[nn];B[mh];W[oj];B[nh];W[nf];B[oh];W[pj];B[nd];W[lc];B[je];W[hf];B[lb];W[ki];B[kj];W[li];B[mi];W[mj];B[kl];W[ne];B[ri];W[md];B[mc];W[ld];B[kd];W[na];B[lf];W[mg];B[ng];W[mf];B[mb];W[of];B[mk];W[hq];B[gq];W[ko];B[nj];W[ir];B[iq];W[kq];B[jr];W[kr];B[hp];W[kp];B[sl];W[sm];B[ks];W[ls];B[js];W[lr];B[hm];W[bn];B[cn];W[bm];B[af];W[bh];B[bo];W[il];B[hl];W[jl];B[km];W[kn];B[eb];W[ea];B[fa];W[da];B[cc];W[id];B[ic];W[sf];B[sg];W[se];B[pe];W[oe];B[rg];W[ma];B[kb];W[ao];B[ap];W[an];B[bp];W[ag];B[sj];W[rl];B[la];W[oa];B[hh];W[ig];B[ik];W[jk];B[jj];W[dd];B[ba];W[cd];B[bd];W[sk];B[rj];W[ok];B[ol];W[rk];B[nm];W[on];B[mn];W[mo];B[qd];W[rc];B[pd];W[pc];B[og];W[pi];B[ph];W[ec];B[fb];W[ho];B[go];W[hn];B[gn];W[mm];B[lm];W[kk];B[lk];W[mn]"};
		historyMap["051.sgf"]={"dt":"DT[1669-11-13]","file":"051.sgf","re":"RE[B+13]","moves":";B[oc];W[qp];B[oq];W[lq];B[eq];W[cd];B[ec];W[jc];B[cp];W[qj];B[pk];W[qk];B[pm];W[po];B[np];W[on];B[mo];W[iq];B[qr];W[mn];B[ln];W[mm];B[ql];W[pj];B[ok];W[oj];B[nk];W[lm];B[nj];W[ni];B[mi];W[nh];B[qd];W[mh];B[lj];W[li];B[mj];W[kn];B[lo];W[kl];B[ki];W[lh];B[jj];W[ko];B[mq];W[lr];B[qg];W[kh];B[jh];W[jg];B[ih];W[ig];B[hh];W[hg];B[ph];W[oh];B[gh];W[de];B[lc];W[gc];B[kf];W[pf];B[qf];W[nd];B[nc];W[gg];B[id];W[ic];B[fg];W[ff];B[kg];W[ld];B[gf];W[he];B[fe];W[ge];B[ef];W[fd];B[mf];W[le];B[df];W[cf];B[cg];W[bf];B[cc];W[bc];B[bb];W[cb];B[dc];W[ab];B[ee];W[bg];B[ie];W[hf];B[hd];W[gd];B[hc];W[hb];B[ib];W[jb];B[gb];W[ia];B[fb];W[je];B[ed];W[ff];B[db];W[ba];B[gf];W[jd];B[nn];W[nm];B[no];W[om];B[jm];W[km];B[ch];W[co];B[bp];W[cl];B[cn];W[cj];B[hr];W[hq];B[gr];W[gq];B[ir];W[jr];B[cm];W[el];B[ej];W[dm];B[dn];W[en];B[dk];W[dl];B[eo];W[fo];B[fn];W[em];B[ep]"};
		historyMap["059.sgf"]={"dt":"DT[1670-11-29]","file":"059.sgf","re":"RE[W+9]","moves":";B[jj];W[oq];B[ce];W[oc];B[jq];W[eq];B[qp];W[cp];B[cj];W[dc];B[fc];W[ec];B[gd];W[de];B[df];W[ee];B[cd];W[cc];B[ef];W[fe];B[kc];W[qd];B[qk];W[lq];B[gq];W[po];B[qo];W[pn];B[qn];W[pm];B[qm];W[cm];B[qe];W[pe];B[qf];W[rd];B[pf];W[dh];B[fg];W[dj];B[dk];W[ej];B[ci];W[ch];B[cl];W[dm];B[ek];W[fj];B[fk];W[gj];B[gk];W[hj];B[fh];W[di];B[hg];W[hk];B[gm];W[hm];B[hn];W[im];B[gn];W[ff];B[eg];W[hf];B[ig];W[jo];B[fq];W[ep];B[kp];W[ic];B[id];W[hc];B[hd];W[fb];B[jc];W[km];B[pl];W[ip];B[iq];W[hp];B[gp];W[kr];B[jr];W[nm];B[nl];W[bm];B[mm];W[mn];B[nn];W[mo];B[er];W[dr];B[es];W[ds];B[fr];W[om];B[ml];W[bh];B[bf];W[ko];B[lp];W[mq];B[gl];W[bl];B[bk];W[dl];B[ck];W[aj];B[dq];W[dp];B[fn];W[if];B[jf];W[oe];B[of];W[je];B[ke];W[kf];B[jg];W[le];B[kd];W[nf];B[ng];W[mg];B[nh];W[sg];B[rg];W[ib];B[ne];W[nd];B[mf];W[sf];B[sh];W[re];B[rf];W[se];B[rh];W[lk];B[op];W[pp];B[pq];W[pr];B[qq];W[oo];B[or];W[nq];B[mj];W[qr];B[rr];W[nr];B[qs];W[mc];B[lf];W[os];B[lb];W[mb];B[bd];W[lj];B[li];W[ki];B[lh];W[ji];B[ii];W[ij];B[jh];W[kj];B[bb];W[bc];B[ac];W[cb];B[gc];W[gb];B[jb];W[ia];B[ma];W[na];B[la];W[nb];B[en];W[rs];B[cq];W[cr];B[bq];W[br];B[dn];W[cn];B[ll];W[kl];B[md];W[lc];B[ld];W[ja];B[kb];W[ps];B[sr];W[js];B[is];W[ks];B[kq];W[lr];B[hq];W[ho];B[go];W[el];B[fp];W[eo];B[fl];W[em];B[gs];W[ak];B[bi];W[ai];B[hl];W[il];B[ie];W[gf];B[ln];W[lo];B[lm];W[ol];B[ok];W[hh];B[hi];W[gh];B[gg];W[gi];B[ih];W[ba];B[ab];W[in];B[jp];W[io];B[mp];W[np];B[kh];W[mk];B[nk];W[jk];B[ag];W[bg];B[do];W[co];B[kn];W[jn]"};
		historyMap["062.sgf"]={"dt":"DT[1671-11-21]","file":"062.sgf","re":"RE[W+]","moves":";B[qd];W[oc];B[lc];W[dc];B[cp];W[eq];B[hq];W[cf];B[hc];W[oq];B[do];W[ck];B[fp];W[qj];B[pc];W[qp];B[ch];W[fc];B[cm];W[ej];B[eh];W[gi];B[cd];W[cc];B[ef];W[de];B[fj];W[ei];B[fi];W[fh];B[gh];W[fg];B[eg];W[fk];B[gj];W[gk];B[hj];W[gg];B[bf];W[cg];B[bg];W[dh];B[di];W[dg];B[ce];W[df];B[dd];W[ee];B[ed];W[ff];B[ec];W[eb];B[fb];W[gb];B[fd];W[fa];B[gc];W[fb];B[od];W[cr];B[dr];W[jq];B[fq];W[pm];B[lq];W[kp];B[nq];W[np];B[or];W[pq];B[mp];W[nr];B[mr];W[mq];B[bc];W[bb];B[nq];W[bd];B[be];W[mq];B[pk];W[nq];B[qk];W[pj];B[ok];W[ni];B[qm];W[rj];B[mk];W[lj];B[lk];W[kj];B[kk];W[jk];B[jl];W[il];B[jm];W[im];B[mi];W[mj];B[nj];W[oj];B[nk];W[mh];B[oi];W[nh];B[ph];W[qh];B[pg];W[qg];B[jj];W[ik];B[li];W[ki];B[lh];W[lg];B[kh];W[ji];B[jh];W[ii];B[pf];W[qf];B[ng];W[mg];B[ih];W[hi];B[jf];W[kd];B[hh];W[ij];B[le];W[me];B[nf];W[kf];B[re];W[je];B[rf];W[ac];B[ci];W[bj];B[bi];W[nd];B[ne];W[md];B[dk];W[oe];B[pd];W[mf];B[he];W[rm];B[rk];W[dj];B[ie];W[if];B[hf];W[jg];B[hg];W[nb];B[ob];W[of];B[pe];W[ai];B[ah];W[aj];B[jc];W[kc];B[jd];W[ln];B[ld];W[kb];B[ke];W[lb];B[jf];W[mc]"};
		historyMap["069.sgf"]={"dt":"DT[1674-01-08]","file":"069.sgf","re":"RE[B+12]","moves":";B[qe];W[dc];B[ce];W[qp];B[oq];W[mq];B[eq];W[po];B[qj];W[np];B[pc];W[cp];B[iq];W[cg];B[do];W[co];B[dn];W[cm];B[dm];W[cl];B[cn];W[bn];B[bm];W[bl];B[bo];W[am];B[cq];W[bp];B[gc];W[ed];B[jc];W[ql];B[dg];W[ch];B[bc];W[df];B[cf];W[ef];B[cb];W[qh];B[pl];W[qm];B[pi];W[og];B[ni];W[mg];B[nf];W[oh];B[mi];W[mh];B[ki];W[kg];B[jg];W[jf];B[ig];W[kh];B[ji];W[he];B[kf];W[je];B[ke];W[kd];B[ld];W[jh];B[ih];W[ii];B[hf];W[jd];B[ge];W[lc];B[me];W[hd];B[gd];W[nd];B[ne];W[ic];B[fg];W[od];B[pe];W[oi];B[oj];W[nj];B[nk];W[lj];B[li];W[mj];B[nl];W[ll];B[jk];W[ml];B[nm];W[mn];B[mm];W[lm];B[ln];W[jl];B[nn];W[mo];B[kn];W[il];B[hk];W[hl];B[op];W[oo];B[no];W[kq];B[kp];W[jq];B[lp];W[mp];B[lq];W[lr];B[kr];W[nr];B[jr];W[or];B[ph];W[pg];B[qg];W[qf];B[rg];W[rf];B[rh];W[oe];B[pf];W[of];B[km];W[gk];B[eg];W[pd];B[ek];W[hj];B[kl];W[jj];B[kj];W[ik];B[qd];W[qc];B[rc];W[qb];B[re];W[hb];B[gb];W[kk];B[lk];W[hh];B[gg];W[io];B[hn];W[in];B[pb];W[ob];B[ho];W[dp];B[ep];W[dl];B[el];W[fm];B[em];W[hp];B[fn];W[ip];B[jp];W[ei];B[gi];W[fj];B[dh];W[ci];B[di];W[hi];B[cj];W[bj];B[bg];W[bh];B[ah];W[bi];B[qa];W[dq];B[dr];W[bq];B[rk];W[rl];B[ls];W[mr];B[pq];W[pr];B[qq];W[qr];B[qn];W[pn];B[rn];W[ro];B[pm];W[sn];B[sm];W[so];B[qk];W[qo];B[bf];W[cr];B[gq];W[hq];B[hr];W[gp];B[fr];W[ds];B[oa];W[nb];B[hc];W[ib];B[fi];W[jk];B[ej];W[er];B[ck];W[bk];B[gm];W[fp];B[fq];W[fs];B[gs];W[eo];B[es];W[rb];B[sb];W[fs];B[gr];W[fo];B[hm];W[im];B[gl];W[gj];B[es];W[bd];B[cd];W[fs];B[if];W[hg];B[kc];W[id];B[mb];W[la];B[ma];W[mc];B[na];W[lb];B[pa];W[ga];B[fa];W[ha];B[sl];W[rm];B[sk];W[ms];B[ks];W[ai];B[ag];W[gh];B[fh];W[dk];B[dj];W[oc];B[ra];W[on];B[mk];W[lh];B[nh];W[ng];B[om];W[go];B[fl];W[es]"};
		historyMap["079.sgf"]={"dt":"DT[1674-12-21]","file":"079.sgf","re":"RE[W+6]","moves":";B[qd];W[oc];B[mc];W[qo];B[ep];W[ce];B[od];W[qi];B[nc];W[pq];B[iq];W[kq];B[cj];W[gq];B[gp];W[cp];B[cq];W[bq];B[dq];W[bo];B[cg];W[dc];B[gc];W[hq];B[hp];W[ir];B[cn];W[do];B[fq];W[ip];B[io];W[jp];B[bn];W[dn];B[fn];W[cl];B[bl];W[cr];B[dr];W[cs];B[ao];W[dm];B[bm];W[bp];B[el];W[ck];B[bk];W[dj];B[ci];W[fo];B[eo];W[fm];B[em];W[en];B[gn];W[gm];B[hn];W[kn];B[ek];W[dk];B[pj];W[pi];B[oj];W[oi];B[nj];W[rk];B[ni];W[dh];B[di];W[ej];B[gk];W[qe];B[pe];W[qf];B[rd];W[ng];B[pf];W[pg];B[fh];W[gj];B[hj];W[ei];B[fj];W[eh];B[bf];W[fg];B[gh];W[gg];B[be];W[hh];B[hi];W[ih];B[kj];W[jd];B[ef];W[df];B[dg];W[eg];B[de];W[fd];B[gd];W[fe];B[ge];W[fc];B[hf];W[jf];B[jb];W[jj];B[kk];W[ik];B[jl];W[hk];B[hl];W[il];B[im];W[ji];B[jk];W[ij];B[fl];W[kb];B[kc];W[jc];B[ib];W[lc];B[lb];W[kd];B[ka];W[mb];B[kc];W[ch];B[bh];W[kb];B[la];W[pl];B[nm];W[nb];B[ob];W[nl];B[ml];W[om];B[mm];W[no];B[nn];W[oo];B[gb];W[ff];B[cd];W[ln];B[lh];W[hg];B[cc];W[rg];B[re];W[cb];B[bb];W[fr];B[er];W[db];B[rf];W[qg];B[gr];W[hr];B[fs];W[jm];B[km];W[jn];B[lm];W[ba];B[ab];W[fb];B[kc];W[fi];B[gi];W[kb];B[qj];W[rj];B[kc];W[ii];B[gj];W[kb];B[qk];W[ql];B[kc];W[bc];B[bd];W[kb];B[on];W[pn];B[kc];W[bi];B[bj];W[kb];B[br];W[ar];B[kc];W[bg];B[ag];W[kb];B[ds];W[bs];B[kc];W[ld];B[me];W[if];B[ic];W[nk];B[mk];W[of];B[nh];W[oe];B[pd];W[oh];B[mg];W[lf];B[lg];W[mf];B[ne];W[ki];B[li];W[le];B[jg];W[nf];B[nd];W[in];B[hm];W[dd];B[cf];W[ee];B[id];W[kg];B[kh];W[kf];B[jh];W[ie];B[he];W[df];B[mn];W[mo];B[sg];W[sh];B[sf];W[ce];B[fa];W[ea];B[ga];W[jo];B[ho];W[ap];B[an];W[de];B[hs];W[is];B[gs]"};
		historyMap["082.sgf"]={"dt":"DT[1675-12-06]","file":"082.sgf","re":"RE[W+18]","moves":";B[qd];W[oc];B[mc];W[ec];B[cp];W[eq];B[hq];W[qo];B[oq];W[qq];B[lq];W[cm];B[do];W[cj];B[fp];W[kc];B[ce];W[cc];B[ch];W[oe];B[qg];W[pf];B[qf];W[qc];B[rc];W[pd];B[qe];W[qb];B[ei];W[ej];B[fj];W[ek];B[fi];W[cr];B[cn];W[bm];B[dr];W[bh];B[bg];W[bi];B[ee];W[dh];B[dg];W[di];B[fc];W[fb];B[fd];W[gb];B[eh];W[hd];B[kd];W[ld];B[lc];W[ke];B[jd];W[jc];B[le];W[md];B[je];W[id];B[kf];W[me];B[hf];W[qi];B[rb];W[no];B[lo];W[dq];B[br];W[cq];B[bq];W[fq];B[gp];W[eo];B[en];W[hr];B[ir];W[dp];B[bo];W[gq];B[gr];W[hp];B[iq];W[go];B[ho];W[fo];B[hn];W[ep];B[gp];W[gm];B[fl];W[fm];B[em];W[hm];B[jm];W[jl];B[kl];W[fk];B[gl];W[el];B[gk];W[gj];B[hk];W[dm];B[dn];W[bn];B[ap];W[ik];B[hj];W[im];B[jk];W[jn];B[il];W[ip];B[jp];W[io];B[ql];W[km];B[pj];W[jl];B[ij];W[pi];B[oi];W[ph];B[oj];W[oh];B[qa];W[ll];B[kk];W[mh];B[qn];W[po];B[rn];W[rk];B[qk];W[rh];B[oa];W[nb];B[rg];W[rl];B[lk];W[nr];B[nq];W[or];B[mr];W[pq];B[jo];W[in];B[lh];W[if];B[ie];W[he];B[ig];W[gf];B[hg];W[ge];B[mf];W[na];B[ng];W[nf];B[og];W[pg];B[of];W[ne];B[nh];W[pe];B[mi];W[bd];B[fg];W[ro];B[so];W[sp];B[sn];W[rq];B[lm];W[pm];B[qm];W[bs];B[ar];W[fr];B[hs];W[mp];B[mq];W[lp];B[kp];W[kq];B[jq];W[kr];B[ns];W[pr];B[ks];W[op];B[kn];W[jm];B[nm];W[om];B[ol];W[nn];B[mm];W[sg];B[sf];W[sh];B[sd];W[be];B[bf];W[ed];B[fe];W[cd];B[gc];W[hc];B[dd];W[dc];B[de];W[fn];B[co];W[an];B[ao];W[gg];B[gh];W[os];B[sl];W[ms];B[jr];W[rj];B[pn];W[on];B[pl];W[ff];B[ef];W[pb];B[pa];W[mn];B[ln];W[fs];B[ah];W[ai];B[sk];W[sj];B[sm];W[gs];B[hr];W[ae];B[hl];W[ag];B[af];W[ah]"};
		historyMap["086.sgf"]={"dt":"DT[1676-11-29]","file":"086.sgf","re":"RE[W+10]","moves":";B[qd];W[oc];B[lc];W[ec];B[cp];W[eq];B[ic];W[qo];B[qj];W[pi];B[qi];W[pg];B[pe];W[nd];B[of];W[ld];B[kd];W[qh];B[pj];W[oi];B[oj];W[ni];B[pc];W[mc];B[le];W[lb];B[md];W[me];B[lf];W[pb];B[qb];W[nb];B[pa];W[ld];B[kc];W[mf];B[mg];W[ng];B[nf];W[lg];B[mh];W[ob];B[qm];W[kg];B[li];W[nj];B[md];W[ne];B[lk];W[re];B[qf];W[rg];B[rf];W[nl];B[om];W[sf];B[rd];W[ll];B[mk];W[nk];B[ml];W[nm];B[on];W[op];B[pp];W[po];B[oo];W[pq];B[np];W[oq];B[mo];W[nn];B[no];W[ln];B[lm];W[mn];B[kl];W[pl];B[ql];W[ri];B[rj];W[kj];B[mi];W[jn];B[kq];W[mr];B[ko];W[kn];B[ip];W[il];B[jk];W[ho];B[hp];W[go];B[jf];W[oe];B[qe];W[cd];B[cm];W[dn];B[co];W[gq];B[hr];W[jg];B[ig];W[ih];B[jh];W[ck];B[dm];W[ch];B[dg];W[dh];B[fg];W[gg];B[if];W[cr];B[gp];W[fo];B[en];W[eo];B[dk];W[dj];B[ek];W[fh];B[ff];W[bl];B[fm];W[fn];B[em];W[do];B[bm];W[bq];B[hm];W[lq];B[io];W[in];B[fq];W[hn];B[bp];W[cf];B[cq];W[fr];B[fp];W[dq];B[gr];W[br];B[gh];W[fi];B[cl];W[bk];B[gi];W[gj];B[ii];W[ij];B[jj];W[hj];B[hi];W[gd];B[ge];W[fe];B[fj];W[hl];B[gm];W[jl];B[am];W[hc];B[rn];W[ro];B[so];W[sp];B[sn];W[rq];B[pf];W[er];B[cg];W[df];B[eg];W[bg];B[he];W[pk];B[qn];W[lp];B[lo];W[kp];B[jo];W[jq];B[pd];W[od];B[fd];W[fc];B[ee];W[ej];B[fk];W[eh];B[dd];W[dc];B[cc];W[bd];B[kb];W[la];B[hb];W[gb];B[hd];W[gc];B[ia];W[ed];B[de];W[ce];B[fe];W[cb];B[js];W[kr];B[nq];W[nr];B[se];W[qk];B[rk];W[iq];B[hq];W[cn];B[bn];W[ap];B[ao];W[aq];B[al];W[ak];B[si];W[rh];B[ka];W[oa];B[qa];W[ga];B[ks];W[ls];B[ir];W[jr];B[is];W[ha];B[ib];W[gl];B[fs];W[es];B[gs];W[fl];B[el];W[km];B[im];W[jm];B[lj];W[mm];B[ll];W[sg];B[ld]"};
		historyMap["093.sgf"]={"dt":"DT[1678-01-17]","file":"093.sgf","re":"RE[W+5]","moves":";B[cp];W[eq];B[gq];W[oq];B[qe];W[qp];B[pc];W[eo];B[dn];W[en];B[dm];W[iq];B[dc];W[qj];B[ic];W[ch];B[cj];W[ce];B[de];W[cd];B[dd];W[df];B[ef];W[cc];B[qh];W[pf];B[qf];W[oc];B[od];W[nd];B[pd];W[cq];B[dp];W[dq];B[ep];W[fp];B[fq];W[gp];B[bq];W[er];B[br];W[hq];B[qo];W[pp];B[ql];W[om];B[pk];W[nk];B[pj];W[fl];B[kk];W[ll];B[kl];W[km];B[lk];W[mk];B[jm];W[lm];B[il];W[jn];B[in];W[jo];B[li];W[jc];B[jd];W[kc];B[id];W[nc];B[kd];W[lc];B[ld];W[ib];B[hb];W[jb];B[ne];W[ni];B[ob];W[nb];B[pb];W[gb];B[hc];W[md];B[me];W[mb];B[dg];W[cf];B[eg];W[hm];B[im];W[rn];B[qn];W[ro];B[on];W[pm];B[qm];W[pn];B[gk];W[ci];B[dj];W[ei];B[fj];W[bj];B[bk];W[fi];B[di];W[dh];B[eh];W[ej];B[cb];W[bb];B[bc];W[db];B[cg];W[bg];B[bf];W[be];B[bh];W[dk];B[bi];W[fk];B[eb];W[ca];B[gh];W[hj];B[hi];W[hk];B[hl];W[gl];B[ij];W[mh];B[lh];W[cl];B[bm];W[bl];B[al];W[ck];B[aj];W[sm];B[rk];W[mg];B[lg];W[sk];B[rj];W[ph];B[pg];W[og];B[qg];W[fb];B[ec];W[ea];B[fa];W[ga];B[ha];W[fh];B[gg];W[pi];B[qi];W[mf];B[lf];W[cm];B[cn];W[cr];B[ik];W[gj];B[af];W[po];B[of];W[nf];B[oe];W[hn];B[io];W[oi];B[mi];W[nh];B[fc];W[ae];B[ag];W[bs];B[rm];W[sl];B[ol];W[pl];B[ok];W[nl];B[bo];W[ip];B[ho];W[go];B[em];W[fm];B[ab];W[bd];B[ac];W[mj];B[sj];W[rp];B[ia];W[ja];B[na];W[ma];B[oa];W[oj];B[qk];W[lj];B[kj];W[fg];B[ff];W[do];B[co];W[hp];B[ar];W[aa];B[ba];W[cb];B[gc];W[aa];B[fa];W[ad];B[da]"};
		historyMap["104.sgf"]={"dt":"DT[1679-11-27]","file":"104.sgf","re":"RE[W+3]","moves":";B[qd];W[oc];B[lc];W[ec];B[cp];W[eq];B[gq];W[qo];B[ic];W[qg];B[pe];W[qj];B[op];W[pq];B[oq];W[pr];B[kq];W[cd];B[nd];W[cm];B[do];W[cj];B[fp];W[or];B[nr];W[nq];B[mp];W[qb];B[pb];W[hc];B[hd];W[gc];B[ib];W[fe];B[di];W[dj];B[ei];W[bh];B[cn];W[dm];B[hi];W[cr];B[bq];W[mr];B[mq];W[ns];B[pk];W[pj];B[ok];W[rl];B[qf];W[pg];B[nf];W[rf];B[re];W[pf];B[qe];W[pc];B[rb];W[pa];B[qc];W[ra];B[qa];W[ep];B[eo];W[qb];B[nb];W[gr];B[hr];W[fq];B[gp];W[br];B[hf];W[rc];B[sb];W[oe];B[od];W[of];B[rg];W[rh];B[sf];W[ne];B[md];W[me];B[ar];W[cq];B[bo];W[fs];B[bm];W[bl];B[hs];W[ds];B[pn];W[gk];B[qn];W[po];B[oo];W[rn];B[ch];W[cg];B[dg];W[ci];B[dh];W[cf];B[hk];W[hl];B[ik];W[gi];B[gh];W[gj];B[hh];W[gm];B[il];W[im];B[jm];W[in];B[fl];W[gl];B[jn];W[ni];B[mj];W[mi];B[lj];W[am];B[em];W[ej];B[bn];W[ke];B[li];W[kc];B[kb];W[kd];B[mb];W[lh];B[kh];W[kg];B[jg];W[kf];B[ql];W[qm];B[pm];W[rm];B[ga];W[fb];B[io];W[kr];B[lr];W[ls];B[lq];W[jh];B[ki];W[ig];B[jf];W[if];B[je];W[ie];B[jd];W[he];B[ih];W[jr];B[jq];W[ho];B[hp];W[nj];B[nk];W[qk];B[sh];W[ri];B[dl];W[cl];B[dp];W[bs];B[lg];W[mh];B[le];W[lf];B[ld];W[pl];B[ol];W[ef];B[fh];W[ir];B[iq];W[ks];B[pp];W[qp];B[np];W[nr];B[id];W[gd];B[gf];W[ge];B[df];W[de];B[dq];W[dr];B[hn];W[hm];B[go];W[dk];B[el];W[hj];B[ij];W[fn];B[en];W[fi];B[ff];W[eg];B[eh];W[gn];B[an];W[al];B[oj];W[oi];B[jc];W[mf];B[fa];W[ea];B[hb];W[gb];B[ha];W[si];B[sg];W[is];B[fg];W[ee];B[hg];W[ql];B[ho]"};
		historyMap["111.sgf"]={"dt":"DT[1682-01-30]","file":"111.sgf","re":"RE[W+19]","moves":";B[cp];W[eq];B[hq];W[ce];B[qp];W[oq];B[mq];W[qe];B[ed];W[dc];B[ec];W[db];B[ic];W[ck];B[dq];W[eb];B[gc];W[ql];B[po];W[oo];B[pm];W[pl];B[on];W[no];B[pq];W[nq];B[lp];W[lo];B[ko];W[ln];B[nn];W[mp];B[lq];W[kn];B[jo];W[nl];B[ml];W[nk];B[mm];W[jn];B[in];W[im];B[hn];W[lk];B[qm];W[do];B[co];W[ip];B[io];W[dr];B[dn];W[gq];B[gr];W[hp];B[fq];W[gp];B[er];W[ep];B[fp];W[fo];B[fr];W[gn];B[hm];W[en];B[dm];W[hr];B[iq];W[jq];B[ir];W[jr];B[hs];W[jp];B[kp];W[fl];B[hk];W[kl];B[gj];W[fj];B[fi];W[ej];B[ei];W[gi];B[dj];W[el];B[hi];W[gh];B[hh];W[fg];B[eg];W[hg];B[ig];W[ef];B[dg];W[hf];B[cj];W[ih];B[dk];W[dl];B[bk];W[cl];B[ek];W[fk];B[bl];W[ks];B[is];W[il];B[hl];W[ms];B[mr];W[ls];B[jg];W[di];B[ci];W[ij];B[hj];W[jh];B[kh];W[ki];B[df];W[ie];B[ke];W[jd];B[lc];W[jc];B[kd];W[lb];B[kb];W[kc];B[jb];W[ld];B[mc];W[kf];B[le];W[lf];B[me];W[je];B[mf];W[lh];B[pc];W[qh]"};
		historyMap["120.sgf"]={"dt":"DT[1683-01-17]","file":"120.sgf","re":"RE[W+15]","moves":";B[qd];W[oc];B[mc];W[dc];B[cp];W[eq];B[ce];W[ed];B[jc];W[qp];B[oq];W[kq];B[qi];W[pq];B[np];W[pn];B[on];W[oo];B[no];W[om];B[nn];W[pl];B[ko];W[ph];B[qh];W[qf];B[od];W[pg];B[pi];W[oi];B[oj];W[nj];B[ni];W[oh];B[nk];W[pj];B[mj];W[qj];B[hq];W[do];B[co];W[dn];B[cm];W[dm];B[cl];W[ip];B[hp];W[jo];B[hn];W[kn];B[pr];W[ml];B[qm];W[pm];B[dq];W[dr];B[cr];W[dp];B[cq];W[lo];B[qq];W[pp];B[rr];W[rq];B[qr];W[fp];B[gm];W[ek];B[gk];W[ei];B[df];W[im];B[dl];W[el];B[fm];W[em];B[gi];W[eg];B[fe];W[gh];B[hh];W[gg];B[hi];W[ge];B[dh];W[eh];B[fd];W[ee];B[ef];W[ff];B[fc];W[ec];B[hd];W[cd];B[ci];W[he];B[id];W[dk];B[ck];W[ie];B[kh];W[nr];B[or];W[ij];B[ji];W[jg];B[jh];W[hj];B[gj];W[hl];B[gl];W[mh];B[kk];W[lc];B[md];W[ld];B[je];W[me];B[pc];W[mb];B[ob];W[kf];B[ke];W[le];B[kb];W[nc];B[nd];W[lb];B[gd];W[kc];B[jb];W[li];B[jl];W[il];B[mg];W[nh];B[lh];W[nb];B[pb];W[jf];B[mi];W[ok];B[ll];W[mm];B[mk];W[re];B[rd];W[bf];B[dg];W[be];B[jd];W[lg];B[eb];W[db];B[fb];W[rp];B[mr];W[mq];B[nq];W[lr];B[ns];W[iq];B[gr];W[bh];B[qe];W[rf];B[of];W[nf];B[pf];W[qg];B[bi];W[fr];B[ir];W[jr];B[go];W[oe];B[pd];W[ne];B[rb];W[is];B[hr];W[cn];B[bn];W[pe];B[ds];W[es];B[er];W[bo];B[bm];W[dr];B[cs];W[fo];B[jm];W[in];B[km];W[jn];B[er];W[fs];B[da];W[ca];B[ea];W[cb];B[lp];W[kp];B[mp];W[jj];B[kj];W[fn];B[gn];W[lm];B[jk];W[lq];B[hg];W[hf];B[sq];W[sp];B[sr];W[ii];B[ih];W[de];B[dj];W[ej];B[ch];W[bg];B[nl];W[cf];B[ah];W[ag];B[ai];W[ls];B[se];W[sf];B[sd];W[ms];B[nr];W[di];B[cj];W[ig];B[ol];W[nj];B[lf];W[mf];B[oj];W[pk];B[kg];W[ng];B[op];W[po];B[mn];W[ln];B[fi];W[fh];B[la];W[oa];B[pa];W[na];B[nj];W[dr]"};
		historyMap["122.sgf"]={"dt":"DT[1684-01-05]","file":"122.sgf","re":"RE[B+1]","moves":";W[cd];B[ec];W[nc];B[qg];W[ic];B[qp];W[oq];B[lq];W[dc];B[cm];W[qc];B[pc];W[qd];B[qe];W[re];B[qf];W[pb];B[ob];W[qb];B[oc];W[qm];B[po];W[qj];B[nd];W[ed];B[cj];W[lp];B[kp];W[mq];B[lo];W[mp];B[kq];W[on];B[pq];W[ko];B[jo];W[kn];B[jn];W[ip];B[km];W[ln];B[jp];W[fq];B[eq];W[fp];B[hq];W[iq];B[hp];W[do];B[co];W[dn];B[cn];W[er];B[dr];W[gr];B[hr];W[cq];B[es];W[dq];B[fr];W[ep];B[cp];W[er];B[lm];W[mn];B[eq];W[pr];B[er];W[qr];B[rf];W[nb];B[mc];W[mb];B[lc];W[lb];B[oa];W[kc];B[rd];W[ho];B[go];W[gn];B[hn];W[io];B[ir];W[fo];B[gp];W[dj];B[ci];W[dl];B[cl];W[hm];B[in];W[cg];B[gm];W[fn];B[gl];W[gk];B[hk];W[gj];B[fl];W[el];B[ej];W[ei];B[di];W[fk];B[hl];W[eh];B[dg];W[dh];B[ch];W[eg];B[bg];W[df];B[hj];W[md];B[if];W[ne];B[oe];W[of];B[ql];W[pl];B[qk];W[pk];B[rm];W[qn];B[rj];W[ri];B[qi];W[pj];B[rk];W[rn];B[bf];W[od];B[gi];W[ek];B[nd];W[hh];B[ih];W[od];B[pe];W[hg];B[ig];W[hf];B[hi];W[qh];B[rh];W[pi];B[si];W[sm];B[sl];W[rl];B[dm];W[em];B[rm];W[sn];B[ad];W[bc];B[he];W[ie];B[je];W[id];B[gf];W[ge];B[gg];W[hd];B[dk];W[fi];B[gh];W[sj];B[qi];W[rc];B[se];W[ri];B[sh];W[qi];B[mj];W[rl];B[en];W[fm];B[rm];W[ml];B[mm];W[nm];B[ll];W[rl];B[mg];W[mk];B[lk];W[nj];B[nk];W[nl];B[ni];W[mi];B[lj];W[nh];B[oj];W[mh];B[lh];W[lg];B[li];W[kf];B[jf];W[kh];B[kg];W[lf];B[rm];W[sd];B[sc];W[rl];B[eo];W[gq];B[gs];W[fj];B[sb];W[jg];B[ki];W[lr];B[kr];W[be];B[ae];W[ac];B[rm];W[cr];B[br];W[rl];B[ff];W[cf];B[fe];W[fd];B[rm];W[hs];B[is];W[rl];B[nd];W[me];B[rm];W[bh];B[bi];W[rl];B[he];W[hf];B[mr];W[nr];B[ls];W[sk];B[ke];W[le];B[og];W[ng];B[pf];W[ok];B[nf];W[oh];B[nj];W[dj];B[ah];W[ck];B[bk];W[af];B[ag];W[dk];B[hg];W[he];B[ee];W[de];B[jh];W[kg];B[na];W[ma];B[jd];W[jc];B[kd];W[ld];B[ns];W[os];B[ms];W[od]"};
		historyMap["128.sgf"]={"dt":"DT[1696-12-23]","file":"128.sgf","re":"RE[B+1]","moves":";W[cn];B[gq];W[dc];B[mc];W[qo];B[cp];W[ci];B[de];W[fd];B[cc];W[cb];B[cd];W[bb];B[ef];W[cf];B[hc];W[gc];B[hd];W[ge];B[ei];W[ff];B[eg];W[dj];B[ej];W[dk];B[jd];W[qf];B[oq];W[qq];B[lq];W[qc];B[qd];W[pc];B[od];W[nb];B[rd];W[mb];B[lc];W[lb];B[kb];W[oc];B[qi];W[nd];B[ne];W[me];B[nf];W[md];B[mf];W[lf];B[lg];W[le];B[kg];W[je];B[he];W[og];B[nh];W[pi];B[qh];W[hf];B[gb];W[fb];B[gd];W[fc];B[ie];W[if];B[jf];W[jg];B[ke];W[kf];B[je];W[nc];B[jh];W[ig];B[gg];W[gf];B[kc];W[of];B[rf];W[ih];B[fl];W[eo];B[ep];W[em];B[hl];W[gm];B[hj];W[ji];B[mi];W[oj];B[qj];W[mj];B[lj];W[ni];B[mk];W[nk];B[nj];W[gl];B[gk];W[mj];B[el];W[dl];B[nj];W[ik];B[ij];W[mj];B[jj];W[lk];B[nj];W[ib];B[hb];W[mj];B[ml];W[li];B[nj];W[ka];B[mj];W[jb];B[qm];W[rm];B[rl];W[pm];B[qn];W[po];B[rn];W[np];B[nq];W[pn];B[nn];W[ro];B[hn];W[no];B[lo];W[mp];B[mq];W[gn];B[ho];W[hm];B[im];W[fk];B[gj];W[il];B[hk];W[lp];B[kp];W[ko];B[ln];W[in];B[jm];W[hp];B[go];W[gp];B[fp];W[fo];B[io];W[jo];B[ip];W[jp];B[iq];W[kq];B[kr];W[ek];B[pr];W[qr];B[jq];W[bo];B[bp];W[ol];B[oi];W[mg];B[ng];W[ap];B[aq];W[ao];B[bq];W[kh];B[kp];W[ql];B[sm];W[so];B[qk];W[kq];B[la];W[ja];B[kp];W[pl];B[sn];W[kq];B[dn];W[en];B[kp];W[dh];B[fg];W[kq];B[do];W[dm];B[kp];W[pj];B[ph];W[kq];B[cm];W[bm];B[kp];W[sk];B[rk];W[kq];B[cl];W[bl];B[kp];W[sl];B[rm];W[kq];B[ic];W[ma];B[kp];W[lh];B[kq];W[rc];B[be];W[bf];B[dd];W[bc];B[af];W[ag];B[ae];W[cg];B[ec];W[db];B[ed];W[eb];B[sc];W[sb];B[sd];W[hh];B[gh];W[eh];B[fj];W[fh];B[fi];W[rb];B[qs];W[rs];B[ps];W[rr];B[op];W[oo];B[nl];W[pq];B[or];W[kj];B[kk];W[ki];B[ok];W[pk];B[co];W[bn];B[pp];W[qp];B[ad];W[ac];B[mh];W[lg];B[nm];W[mo];B[mn]"};
		const letters2numbers = {}
		letters2numbers["a"]=1;
		letters2numbers["b"]=2;
		letters2numbers["c"]=3;
		letters2numbers["d"]=4;
		letters2numbers["e"]=5;
		letters2numbers["f"]=6;
		letters2numbers["g"]=7;
		letters2numbers["h"]=8;
		letters2numbers["i"]=9;
		letters2numbers["j"]=10;
		letters2numbers["k"]=11;
		letters2numbers["l"]=12;
		letters2numbers["m"]=13;
		letters2numbers["n"]=14;
		letters2numbers["o"]=15;
		letters2numbers["p"]=16;
		letters2numbers["q"]=17;
		letters2numbers["r"]=18;
		letters2numbers["s"]=19;
		letters2numbers["t"]=20;
	
		function filterEmptyStrings(item) {
			return item.length > 0
		}
		let x = historyMap[key]
		let m = x["moves"]
		let pieces = m.split(";")
		pieces = pieces.filter(filterEmptyStrings)
		let a_game = []
	
		pieces.forEach((p,i)=>{
			let item = p.replace("W[", "")
			item = item.replace("B[","")
			item = item.replace("]","")
			item = item.trim()
			const ary = item.split("")
			const row = letters2numbers[ary[0]]
			const col = letters2numbers[ary[1]]
			let x = {
				id:item,
				row:row,
				col:col
			}
			a_game.push( x )
			this.clickOnCell(row, col)	
		})

		this.setState({"game":a_game})
	}

	clickOnCell(row, column) {

		this.setState({currentStoneRow:row})
		this.setState({currentStoneColumn:column})
		let tmp = this.state.board
		if ( tmp !== undefined && row !== undefined && column !== undefined && tmp[row] !== undefined && tmp[row][column] !== undefined ) {
			if (tmp[row][column].owner !== this.black && tmp[row][column].owner !== this.white) {
				tmp[row][column].owner = this.turn
				this.turnCount++
				tmp[row][column].turnCount = this.turnCount
				if (this.turn === this.black) {
					this.turn = this.white;
					this.blackTurn++;
				} else {
					this.turn = this.black;
					this.whiteTurn++;
				}
				let id = number2letter[row] + number2letter[column]
			
				let x = {
					id:id,
					row:row,
					col:column
				}
				let game = this.state.game
				game.push(x)

				this.setState({game:game})
			}
			this.setState({
				board: tmp
			})
		} 
	}
	doNextTurn() { 

		let r = parseInt(Math.random() * 19)  
		let c = parseInt(Math.random() * 19)  
		alert("hello " + r + "   c " + c )



	}
	render() {
		
		return ( 
			<table border='1'>
				<tbody>
				<tr> 
					<td valign='top' rowSpan='2'>
						<Board 
							black = {this.black}
							white = {this.white}
							data = {this.state.board}
							key = {Math.random()}
							board = {this.state.board}
							showText={this.state.showText}
							onClick = {this.clickOnCell.bind()} 
							onChange={this.setShowText.bind()}
							turnCount={this.turnCount}
							doNextTurn={this.doNextTurn}
						></Board>
					</td>
					<td valign="top">
						<button  onClick={(e)=>this.clearTheBoard()}>ctb</button>
						<button  onChange={(e)=>this.advanceCursor()}>&gt;&gt;</button>
            			<button onChange={(e)=>this.decrementCursor()}>&lt;&lt;</button>
						
         				<select id="datasetSelector" onChange={(e)=>this.addSGFGame2()}>
                			<option>select</option>
            				<option>022.sgf</option>
							<option>035.sgf</option>
							<option>051.sgf</option>
							<option>059.sgf</option>
							<option>062.sgf</option>
							<option>069.sgf</option>
							<option>079.sgf</option>
							<option>082.sgf</option>
							<option>086.sgf</option>
							<option>093.sgf</option>
							<option>104.sgf</option>
							<option>111.sgf</option>
							<option>120.sgf</option>
							<option>122.sgf</option>
							<option>128.sgf</option>
            			</select>
						<hr></hr>
						<SGF 
							key={Math.random()}
							gameInfo={this.state.game}
							cursor={this.state.cursor}
						></SGF>
					</td>
				</tr>
				<tr>
					<td valign='top'>
						<Measurements 
							key={Math.random()}
							gameInfo={this.state.game}
							currentStoneRow = {this.state.currentStoneRow}
							currentStoneColumn={this.state.currentStoneColumn}
							board={this.state.board}	
						>

						</Measurements>
					</td>
				</tr>
				</tbody>
			</table>
		)
	}
}
export default App

