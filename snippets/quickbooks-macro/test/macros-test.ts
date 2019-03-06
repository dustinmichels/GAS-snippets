import {cleanData_} from "../src/macros"
import { expect } from "chai";
import "mocha";

const inData = [
  ["", "Type", "Date", "Num", "Adj", "Name", "Memo", "Split", "Debit", "Credit", "Balance"],
  ["5012 · Thing","","","","","","","","","",0  ],
  ["Total 5012 · Thing","","","","","","","","","",0  ],
  ["5013 · Another Thing","","","","","","","","","",0  ],
  ["","Bill","1/1/2019",123,"","name","","2000 · Accounts Payable",100,"",100  ],
  ["","Bill","1/2/2019",124,"","name","","2000 · Accounts Payable",200,"",300  ],
  ["","Bill","1/3/2019",125,"","name","","2000 · Accounts Payable",200,"",500  ],
  ["Total 5013 · Another Thing","","","","","","","",500,0,500  ]
];

const outData = [
  ["Account", "Type", "Date", "Num", "Adj", "Name", "Memo", "Split", "Debit", "Credit", "Balance"],
  ["5013 · Another Thing","Bill","1/1/2019",123,"","name","","2000 · Accounts Payable",100,"",100  ],
  ["5013 · Another Thing","Bill","1/2/2019",124,"","name","","2000 · Accounts Payable",200,"",300  ],
  ["5013 · Another Thing","Bill","1/3/2019",125,"","name","","2000 · Accounts Payable",200,"",500  ]
];

describe("#cleanData_()", () => {
  it("can transform data array", () => {
    const result = cleanData_(inData);
    expect(result).to.eql(outData);
  });
});

