# aws-spot-price

Lists current global AWS EC2 Spot Instance prices. Requires valid AWS SDK Access & Secret keys.

`npx aws-spot-price --help`

```
$ npx aws-spot-price -i c4.large c5.large -l 20
................
╔══════════╤══════════╤═════════════════════════╤═════════════════╤══════════════════════════╗
║ c4.large │ 0.018100 │ Linux/UNIX              │ us-east-2a      │ US East (Ohio)           ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c4.large │ 0.018100 │ Linux/UNIX              │ us-east-2c      │ US East (Ohio)           ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c4.large │ 0.018500 │ Linux/UNIX              │ us-east-2b      │ US East (Ohio)           ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c5.large │ 0.019100 │ Linux/UNIX              │ us-east-2c      │ US East (Ohio)           ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c5.large │ 0.019200 │ Linux/UNIX              │ us-east-2a      │ US East (Ohio)           ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c5.large │ 0.019400 │ Linux/UNIX              │ us-east-2b      │ US East (Ohio)           ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c5.large │ 0.027300 │ Linux/UNIX              │ eu-north-1a     │ EU (Stockholm)           ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c5.large │ 0.027300 │ Linux/UNIX              │ eu-north-1b     │ EU (Stockholm)           ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c5.large │ 0.027300 │ Linux/UNIX              │ eu-north-1c     │ EU (Stockholm)           ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c4.large │ 0.027500 │ Linux/UNIX              │ ca-central-1a   │ Canada (Central)         ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c4.large │ 0.027500 │ Linux/UNIX              │ ca-central-1b   │ Canada (Central)         ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c4.large │ 0.028200 │ Linux/UNIX              │ ap-south-1a     │ Asia Pacific (Mumbai)    ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c4.large │ 0.028500 │ Linux/UNIX              │ ap-northeast-2a │ Asia Pacific (Seoul)     ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c4.large │ 0.028500 │ Linux/UNIX              │ ap-northeast-2c │ Asia Pacific (Seoul)     ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c5.large │ 0.028900 │ Linux/UNIX              │ ca-central-1a   │ Canada (Central)         ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c4.large │ 0.029300 │ Linux/UNIX              │ us-west-1b      │ US West (N. California)  ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c4.large │ 0.029300 │ Linux/UNIX              │ us-west-1c      │ US West (N. California)  ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c4.large │ 0.029700 │ Linux/UNIX (Amazon VPC) │ ap-southeast-1a │ Asia Pacific (Singapore) ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c5.large │ 0.029700 │ Linux/UNIX              │ ca-central-1b   │ Canada (Central)         ║
╟──────────┼──────────┼─────────────────────────┼─────────────────┼──────────────────────────╢
║ c4.large │ 0.029800 │ Linux/UNIX (Amazon VPC) │ ap-southeast-1b │ Asia Pacific (Singapore) ║
╚══════════╧══════════╧═════════════════════════╧═════════════════╧══════════════════════════╝
```
