const chai = require("chai");
const should = chai.should();
const fs = require("fs");
const sinon = require("sinon");
const request = require("request");
const db = require("../db/champions");

const base = "http://localhost:5000";

describe("Champions database", () => {
  describe("Get Method", () => {
    let responseObject;
    let responseBody;
    beforeEach(() => {
      responseObject = {
        statusCode: 200,
        headers: {
          "content-type": "application/json"
        }
      };
      responseBody = {
        status: "success",
        data: [
          {
            id: "aatrox",
            key: 266,
            name: "Aatrox",
            title: "the Darkin Blade",
            tags: ["Fighter", "Tank"],
            stats: {
              hp: 580,
              hpperlevel: 85,
              mp: 100,
              mpperlevel: 0,
              movespeed: 345,
              armor: 33,
              armorperlevel: 3.8,
              spellblock: 32.1,
              spellblockperlevel: 1.25,
              attackrange: 150,
              hpregen: 6.5,
              hpregenperlevel: 0.5,
              mpregen: 0,
              mpregenperlevel: 0,
              crit: 0,
              critperlevel: 0,
              attackdamage: 70,
              attackdamageperlevel: 3.2,
              attackspeedoffset: -0.04,
              attackspeedperlevel: 3
            },
            icon:
              "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Aatrox.png",
            sprite: {
              url:
                "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/champion0.png",
              x: 0,
              y: 0
            },
            description:
              "One of the ancient darkin, Aatrox was once a peerless swordmaster who reveled in the bloody chaos of the battlefield. Trapped within his own blade by the magic of his foes, he waited out the millennia for a suitable host to wield him—this mortal warrior..."
          },
          {
            id: "ahri",
            key: 103,
            name: "Ahri",
            title: "the Nine-Tailed Fox",
            tags: ["Mage", "Assassin"],
            stats: {
              hp: 526,
              hpperlevel: 92,
              mp: 418,
              mpperlevel: 25,
              movespeed: 330,
              armor: 20.88,
              armorperlevel: 3.5,
              spellblock: 30,
              spellblockperlevel: 0.5,
              attackrange: 550,
              hpregen: 6.5,
              hpregenperlevel: 0.6,
              mpregen: 8,
              mpregenperlevel: 0.8,
              crit: 0,
              critperlevel: 0,
              attackdamage: 53.04,
              attackdamageperlevel: 3,
              attackspeedoffset: -0.065,
              attackspeedperlevel: 2
            },
            icon:
              "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Ahri.png",
            sprite: {
              url:
                "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/champion0.png",
              x: 48,
              y: 0
            },
            description:
              "Innately connected to the latent power of Runeterra, Ahri is a vastaya who can reshape magic into orbs of raw energy. She revels in toying with her prey by manipulating their emotions before devouring their life essence. Despite her predatory nature..."
          }
        ]
      };
      this.get = sinon.stub(request, "get");
    });

    afterEach(() => {
      request.get.restore();
    });
    describe("GET /champions", () => {
      it("should return all champions", done => {
        this.get.yields(null, responseObject, JSON.stringify(responseBody));
        request.get(`${base}/api/v1/champions`, (err, res, body) => {
          res.statusCode.should.eql(200);
          res.headers["content-type"].should.contain("application/json");
          body = JSON.parse(body);
          body.status.should.eql("success");
          body.data[0].should.include.keys(
            "id",
            "key",
            "tags",
            "name",
            "sprite",
            "title",
            "description"
          );
          done();
        });
      });
    });

    describe("GET /api/v1/champions/:nameOrKey", () => {
      it("should respond with a single champion", done => {
        this.get.yields(null, responseObject, JSON.stringify(responseBody));
        request.get(`${base}/api/v1/champions/aatrox`, (err, res, body) => {
          res.statusCode.should.eql(200);
          res.headers["content-type"].should.contain("application/json");
          body = JSON.parse(body);
          body.data[0].id.should.eql("aatrox");
        });
        done();
      });
    });

    describe("GET /api/vi/champions/types/:type", () => {
      it("should return champions having target type", done => {
        this.get.yields(null, responseObject, JSON.stringify(responseBody));
        request.get(
          `${base}/api/v1/champions/types/Assassin`,
          (err, res, body) => {
            res.statusCode.should.eql(200);
            res.headers["content-type"].should.contain("application/json");
            body = JSON.parse(body);
            body.data[1].tags.should.contain("Assassin");
          }
        );
        done();
      });
    });
  });

  describe("POST Method", () => {
    describe("POST /api/v1/champions", () => {
      before(() => {
        this.post = sinon.stub(request, "post");
      });
      after(() => {
        request.post.restore();
      });
      it("should return the result of the inserting", done => {
        const result = {
          res: {
            statusCode: 201,
            headers: {
              "content-type": "application/json"
            }
          },
          body: {
            status: "success",
            data: ["success"]
          }
        };

        const options = {
          method: "post",
          body: {
            id: "newdarius",
            key: "123123",
            name: "New Darius",
            title: "the Hand of Noxus",
            tags: ["Fighter", "Tank"],
            stats: {
              hp: 582.24,
              hpperlevel: 100,
              mp: 263,
              mpperlevel: 37.5,
              movespeed: 340,
              armor: 39,
              armorperlevel: 4,
              spellblock: 32.1,
              spellblockperlevel: 1.25,
              attackrange: 175,
              hpregen: 10,
              hpregenperlevel: 0.95,
              mpregen: 6.6,
              mpregenperlevel: 0.35,
              crit: 0,
              critperlevel: 0,
              attackdamage: 64,
              attackdamageperlevel: 5,
              attackspeedoffset: 0,
              attackspeedperlevel: 1
            },
            icon:
              "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/Darius.png",
            sprite: {
              url:
                "http://ddragon.leagueoflegends.com/cdn/8.11.1/img/sprite/champion0.png",
              x: 432,
              y: 48
            },
            description:
              "There is no greater symbol of Noxian might than Darius, the nation's most feared and battle-hardened commander. Rising from humble origins to become the Hand of Noxus, he cleaves through the empire's enemies—many of them Noxians themselves. Knowing that...",
            d_id: "-LdXSat1O9s4iGFCjPU4"
          },
          json: true,
          url: `${base}/api/v1/champions`
        };

        this.post.yields(null, result.res, JSON.stringify(result.body));
        request.post(options, (err, res, body) => {
          res.statusCode.should.equal(201);
          res.headers["content-type"].should.contain("application/json");
          body = JSON.parse(body);
          body.status.should.eql("success");
          body.data[0].should.eql("success");
        });

        done();
      });
    });
  });

  describe("DELETE Method", () => {
    describe("DELETE /api/v1/champions", () => {
      before(() => {
        this.delete = sinon.stub(request, "delete");
      });
      after(() => {
        request.delete.restore();
      });

      it("should return the result of the delete process", done => {
        const options = {
          method: "delete",
          body: {
            nameOrKey: "newdarius"
          },
          json: true,
          url: `${base}/api/v1/champions`
        };

        const result = {
          res: {
            statusCode: 200,
            headers: {
              "content-type": "application/json"
            }
          },
          body: {
            status: "success",
            data: ["success"]
          }
        };
        this.delete.yields(null, result.res, JSON.stringify(result.body));
        request.delete(`${base}/api/v1/champions`, (err, res, body) => {
          res.statusCode.should.equal(200);
          res.headers["content-type"].should.contain("application/json");
          body = JSON.parse(body);
          body.status.should.eql("success");
          body.data[0].should.eql("success");
        });
        done();
      });
    });
  });
});
