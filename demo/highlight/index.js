var circos = new Circos({
  container: '#chart',
});

var gieStainColor = {
  gpos100: 'rgb(0,0,0)',
  gpos: 'rgb(0,0,0)',
  gpos75: 'rgb(130,130,130)',
  gpos66: 'rgb(160,160,160)',
  gpos50: 'rgb(200,200,200)',
  gpos33: 'rgb(210,210,210)',
  gpos25: 'rgb(200,200,200)',
  gvar: 'rgb(220,220,220)',
  gneg: 'rgb(255,255,255)',
  acen: 'rgb(217,47,39)',
  stalk: 'rgb(100,127,164)',
  select: 'rgb(135,177,255)',
};

var drawCircos = function(error, GRCh37, cytobands) {

  data = cytobands.map(function(d) {
    return {
      block_id: d.chrom,
      start: parseInt(d.chromStart),
      end: parseInt(d.chromEnd),
      gieStain: d.gieStain,
    };
  });

  circos
    .layout(
      {
        innerRadius: 200,
        outerRadius: 250,
        labels: {display: false},
        ticks: {display: false},
      },
      GRCh37
    )
    .highlight('cytobands', {
      innerRadius: 200,
      outerRadius: 250,
      opacity: 0.5,
      color: function(d) {
        return gieStainColor[d.gieStain];
      },
    }, data)
    .render();
};

d3.queue()
  .defer(d3.json, 'GRCh37.json')
  .defer(d3.csv, 'cytobands.csv')
  .await(drawCircos);
