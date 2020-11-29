export const MethylAlcohol = `
<C>
  <H/>
  <H/>
  <H/>
  <OH/>
</C>

or

<Mol recursion>
  <CH3/>
  <OH/>
</Mol>
`
export const AcetilAcid = `
<C>
  <CH3/>
  <O double/>
  <OH/>
</C>

or

<Mol recursion>
  <CH3/>
  <COOH/>
</Mol>
`
export const Polyethylene = `
<H>
  <Poly n={100}}>
  {next =>
    <CH2>
      <CH2>
      {next||<H/>}
      </CH2>
    </CH2>
  }
  </Poly>
</H>

or

<H>
  <Poly n={100}}>
  {next =>
    <CH2>
      <CH2>
      {next||<H/>}
      </CH2>
    </CH2>
  }
  </Poly>
</H>
`
export const Polypropylene = `
<H>
  <Poly n={2}>
    {(children, i) =>
      <C angle={(i%2)*Math.PI/2}>
        <C angle={(i%2)*Math.PI/2}>
          {children||<H/>}
          <CH3/>
          <H/>
        </C>
        <H/><H/>
      </C>
    }
  </Poly>
</H>
`
export const Random = `
<H max={2000}>
    <Poly n={200}>
    {children =>
        <C angle={rand()}>
            <C angle={rand()}>
                {children||<H/>}
                <H/>
                <C><H/><H/><H/></C>
            </C>
            <H/><H/>
        </C>
    }
    </Poly>
</H>
`
