import React from 'react';

class Controller extends React.Component {
    constructor(props) { 
        super(props)
        this.hist = []
        this.count = 0 
        this.cursor = 0
    }
    newGame() { 
        alert("new game! ")
    }
    playComputer() { 
        alert("play computer! ")
    }
    goForward() {
        let id = "h" + this.cursor
        let obj = document.getElementById(id)
        if ( obj.classList.contains("before_viewing")) {
            obj.classList.remove("before_viewing")
        }
        obj.classList.add("after_viewing")
        this.cursor++
    }
    goBack() {

        this.cursor--
        let id = "h" + this.cursor
        let obj = document.getElementById(id)
        if ( obj.classList.contains("after_viewing")) {
            obj.classList.remove("after_viewing")
        }
        obj.classList.add("before_viewing")


    }
    loadHistory() { 
        let letters2numbers = {
            a:1,
            b:2,
            c:3,
            d:4,
            e:5,
            f:6,
            g:7,
            h:8,
            i:9,
            j:10,
            k:11,
            l:12,
            m:13,
            n:14,
            o:15,
            p:16,
            q:17,
            r:18,
            s:19,
            t:20,
            u:21,
            v:22,
            w:23,
            x:24,
            y:25,
            z:26
        }       
        const data = ";B[qd];W[oc];B[ec];W[kc];B[cp];W[cd];B[oq];W[po];B[qp];W[qo];B[rp];W[qf];B[qe];W[pg];B[od];W[nd];B[oe];W[pc];B[qc];W[qk];B[ep];W[hc];B[cg];W[de];B[cj];W[dk];B[dj];W[ek];B[ck];W[gq];B[gd];W[gc];B[fd];W[dc];B[eb];W[db];B[hd];W[dg];B[dh];W[eh];B[df];W[eg];B[cf];W[ef];B[ee];W[ch];B[bh];W[di];B[ej];W[hg];B[bd];W[be];B[ce];W[dd];B[bf];W[bc];B[ae];W[cb];B[ic];W[ib];B[jb];W[jc];B[id];W[hb];B[ig];W[if];B[hf];W[ih];B[jg];W[jf];B[lc];W[kb];B[gg];W[hh];B[gh];W[gf];B[ff];W[he];B[gi];W[ng];B[nc];W[hj];B[gj];W[hk];B[no];W[nn];B[mn];W[oo];B[np];W[mm];B[ln];W[pq];B[pp];W[nm];B[iq];W[op];B[nq];W[qq];B[rq];W[rr];B[or];W[qr];B[ro];W[rn];B[qn];W[qm];B[sn];W[rm];B[sr];W[ip];B[jq];W[fk];B[mb];W[dq];B[eq];W[er];B[dp];W[dr];B[gk];W[gl];B[hl];W[gm];B[fj];W[il];B[jn];W[jm];B[km];W[kl];B[im];W[jl];B[mf];W[nf];B[ne];W[mg];B[lf];W[lg];B[go];W[in];B[io];W[hn];B[cq];W[cr];B[br];W[hq];B[ho];W[ir];B[jr];W[is];B[cs];W[gr];B[ds];W[bs];B[fr];W[es];B[fq];W[bq];B[fs];W[sq];B[sp];W[sm];B[pr];W[so];B[of];W[og];B[sn];W[ed];B[fe];W[so];B[rf];W[rg];B[sn];W[jp];B[jo];W[so];B[hi];W[ii];B[sn];W[kp];B[lr];W[so];B[pf];W[sq];B[qg];W[qh];B[em];W[fc];B[lm];W[ll];B[fl];W[fm];B[dl];W[fn];B[qf];W[rh]";
        let pieces = data.split(";")

        this.hist = ""
        this.count = 0;
        let css = "before_viewing" 
        pieces.forEach((item,i)=>{
            if ( item.length > 0 ) {
              let ab = item.split("[")
              ab[1] = ab[1].replace("]","")
              let row_col = ab[1].split("")
                this.hist += " <span id='h" + this.count + "' class='" + css + "'>" + item + "</span>"  
                this.count++;
            }
        })
        document.getElementById("history_output").innerHTML = this.hist
    }        
    
  render() {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td className='button' onClick={(e)=>this.newGame()}>new game</td>
                        <td className='button' onClick={(e)=>this.playComputer()}>play computer</td>
                        <td className='button' onClick={(e)=>this.loadHistory()}>loadHistory</td>
                    </tr>
                </tbody>
            </table>
            <hr></hr>
            <div id="history_output">
            </div>
            <hr></hr>
            <table>
                <tr>
                    <td className='button' onClick={(e)=>this.goBack()}>back</td>
                    <td className='button' onClick={(e)=>this.goForward()}>forward</td>
                </tr>
            </table>
        </div>
    )
  }
}
export default Controller;