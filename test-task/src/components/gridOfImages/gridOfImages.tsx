import React from "react";
import {Image} from 'antd'


export const GridOfImages: React.FC = () => {
    return (
        <div>
            <Image width={100} src='https://avatars.dzeninfra.ru/get-zen_doc/1244179/pub_62e41a4477aa332473c65a72_62e41d0877aa332473c9ed2f/scale_1200'/>
            <Image width={100} src='https://avatars.mds.yandex.net/i?id=7132a5e2f46e057f261669f81923857338ab1d01-12632677-images-thumbs&n=13'/>
            <Image width={100} src='https://i.pinimg.com/736x/0f/6b/d1/0f6bd1700080a40dcfcce9f74f47315a.jpg'/>
            <Image width={100} src='https://i.pinimg.com/736x/41/3f/56/413f5605cfccf212cb0e49444b233d59.jpg'/>
        </div>
    )

}