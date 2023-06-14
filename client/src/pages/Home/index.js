import React,{useEffect, useState} from 'react'
import Carousel from '../../components/Carousel';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [toppost, setTopPost] = useState([]);
  const [ForumLoading, setForumLoading] = useState(true)
  useEffect(() => {
    axios.get('/api/top10views').then(res=>{
      setTopPost(res.data)
      setForumLoading(false)
    })
    .catch(err=>{

    })
  
    
  }, [])

  const xemthem = [
    {title: 'Bình Dương: Bảo vệ môi trường phục vụ mục tiêu phát triển bền vững', url: 'https://btnmt.1cdn.vn/2023/06/08/5-2-.jpg'},
    {title: 'Thiếu hụt tài nguyên', url: 'https://moitruongvaxahoi.vn/Data/upload/images/%E1%BA%A3nh%20khan%20hi%E1%BA%BFm%20n%C6%B0%E1%BB%9Bc%20s%E1%BA%A1ch.jpg'},
    {title: 'Vấn đề về rác thải công nghiệp và rác thải sinh hoạt', url: 'https://vnn-imgs-f.vgcloud.vn/2020/01/10/16/o-nhiem1.jpg'},
    {title: 'Nạn chặt phá Rừng, lấn chiếm đất Rừng', url: 'https://nld.mediacdn.vn/291774122806476800/2022/4/19/20220417131014-1650355963960419031495.jpg'},
    {title: 'Săn bắt trái phép động vật hoang giã', url: 'https://bizweb.dktcdn.net/100/414/002/files/te-te-tuyet-chung.jpg?v=1610614484187'},
    {title: 'ĐBQH Hoàng Đức Chính: Dự thảo Luật Đất đai (sửa đổi) đã có bước tiến rất quan trọng về chất', url:'https://btnmt.1cdn.vn/2023/05/25/dat-16791418200261938980856-1679231367474-16792313681162045727172-0-0-438-700-crop-16792314074751817728152.jpeg'},
    {title: 'Thiên tai, biến đổi khí hậu, thời tiết cực đoan.', url: 'https://special.nhandan.vn/biendoi_khihau_dedoa_toancau/assets/hx11TPST8o/bdkh0-nasa-1275x717.jpeg'},
    {title: 'Luật Địa chất và Khoáng sản sẽ được trình Quốc hội cho ý kiến tại kỳ họp thứ 7', url: 'https://btnmt.1cdn.vn/2023/05/23/1.jpg'},
    {title: 'Hành trình 15 năm nỗ lực ứng phó với biến đổi khí hậu ở Việt Nam', url: 'https://btnmt.1cdn.vn/2023/05/09/a2-trang-10-11-1-.jpg'},
    {title: 'Sửa các Nghị định liên quan đến kinh doanh trong lĩnh vực tài nguyên và môi trường', url: 'https://btnmt.1cdn.vn/2023/05/12/bcp.cdnchinhphu.vn-334894974524682240-2023-5-12-_ks-16838889962552082508860-0-0-576-922-crop-1683888999162638833542.jpg'},
  ];

  const carousel = [
    {id: 1, title: 'Ô nhiễm Môi trường', url: 'https://vinmec-prod.s3.amazonaws.com/images/20210419_075603_594970_o-nhiem-nuoc.max-1800x1800.jpg'},
    {id: 2, title: 'Thiếu hụt tài nguyên', url: 'https://moitruongvaxahoi.vn/Data/upload/images/%E1%BA%A3nh%20khan%20hi%E1%BA%BFm%20n%C6%B0%E1%BB%9Bc%20s%E1%BA%A1ch.jpg'},
    {id: 3, title: 'Vấn đề về rác thải công nghiệp và rác thải sinh hoạt', url: 'https://vnn-imgs-f.vgcloud.vn/2020/01/10/16/o-nhiem1.jpg'},
    {id: 4, title: 'Nạn chặt phá Rừng, lấn chiếm đất Rừng', url: 'https://nld.mediacdn.vn/291774122806476800/2022/4/19/20220417131014-1650355963960419031495.jpg'},
    {id: 5, title: 'Săn bắt trái phép động vật hoang giã', url: 'https://bizweb.dktcdn.net/100/414/002/files/te-te-tuyet-chung.jpg?v=1610614484187'},
    {id: 6, title: 'Thiên tai, biến đổi khí hậu, thời tiết cực đoan.', url: 'https://special.nhandan.vn/biendoi_khihau_dedoa_toancau/assets/hx11TPST8o/bdkh0-nasa-1275x717.jpeg'},
  ]

  return (
    <div  className="p-5 min-h-screen flex justify-center w-full bg-[var(--primary-bg-color)] ">
      <div className='flex flex-col max-w-7xl'>

        
        <div className='flex flex-col md:flex-row w-full bg-[var(--sub-bg-color)] mb-2 shadow-lg'>
          <div className='w-full md:w-2/3 p-2'>
            <Carousel slide={carousel} autoslide={true} content={
            <div>
              <span className='text-xl font-semibold text-white'>Môi trường đang là một vấn đề cấp thiết!</span>
            </div>
            }/>
          </div>
          <div className='w-full md:w-1/3 p-2'>
            <div className='text-xl mb-2 font-semibold text-[var(--primary-text-color)]'>Giới thiệu:</div>
            <div className='text-justify mb-2 indent-5 text-base font-normal text-[var(--primary-text-color)]'>
            Hiện nay, vấn đề ô nhiễm môi trường đang là chủ đề nóng trên các mặt báo và nhận được rất nhiều sự quan tâm của người dân. Trong đó, đặc biệt là vấn đề ô nhiễm nguồn nước ở Việt Nam đã và đang ngày càng trở nên nghiêm trọng hơn. Thông qua các phương tiện truyền thông, chúng ta có thể dễ dàng thấy được các hình ảnh, cũng như các bài báo phản ánh về thực trạng môi trường hiện nay. Mặc dù các ban ngành, đoàn thể ra sức kêu gọi bảo vệ môi trường, bảo vệ nguồn nước,... nhưng có vẻ là chưa đủ để cải thiện tình trạng ô nhiễm ngày càng trở nên trầm trọng hơn
            </div>
            <div className='text-justify mb-2 indent-5 text-base font-normal text-[var(--primary-text-color)]'>
            Góp phần vào các cộng đồng hoạt động bảo vệ Tài Nguyên và Môi trường, diễn đàn Bảo vệ tài nguyên môi trường Việt Nam ra đời. Hi vọng mỗi cá nhân, thành viên trong diễn đàn lan tỏa các hoạt động để giúp cho môi trườn Việt Nam ngày thêm xanh sạch đẹp.
            </div>
            <Link to='/forum' className='w-full text-blue-700 mb-2 indent-5 text-base font-normal'>
              Tham gia diễn đàn.
            </Link>
          </div>
        </div>

        <div className='flex bg-[var(--sub-bg-color)] shadow-lg p-2 flex-col lg:flex-row w-full h-full mb-2'>
          <div className="flex w-full lg:w-3/4 flex-col pb-2 border-b-4 md:pb-0">
            <div className='flex w-full mb-2'>
              <div className='flex w-full md:w-2/3 flex-col px-2'>      
                <img
                className='w-full h-fit object-cover max-h-[500px] rounded-lg '
                src='https://btnmt.1cdn.vn/2023/06/13/small_bt-khanh.jpg' alt=''/>
                <span className='text-2xl font-medium text-[var(--primary-text-color)] hover:text-blue-600'>Bộ trưởng Đặng Quốc Khánh chủ trì họp hoàn thiện dự án Luật Tài nguyên nước (sửa đổi)</span>
                <span className='text-base font-normal text-[var(--sub-text-color)]'>By: Admin</span>
              </div>
              <div className='hidden w-1/3 md:flex flex-col px-2'>
                  <img
                  className='w-full h-fit object-cover rounded-lg'
                  src='https://btnmt.1cdn.vn/2023/06/13/cdnmedia.baotintuc.vn-upload-oos7t2ppeydfx8lb8ayig-files-_nuoc-mat.jpg' alt=''/>
                  <span className='text-xl font-medium text-[var(--primary-text-color)] hover:text-blue-600'>Khai thác nước mặt không phép, phớt lờ quyết định xử phạt</span>
                  <span className='text-base font-normal text-[var(--sub-text-color)]'>By: Admin</span>
                  <span className='text-base font-normal text-[var(--primary-text-color)]'>Gần 2 năm từ thời điểm UBND tỉnh Đắk Nông xử phạt một doanh nghiệp về hành vi sử dụng nước mặt để phát điện khi chưa có giấy phép, quyết định này vẫn chưa được thực hiện đầy đủ.</span>
              </div>
            </div>

            <div className='flex flex-wrap w-full'> 

              <div className='w-1/2 sm:w-1/4 md:hidden flex flex-col px-2'>
                <img
                className='w-full h-fit object-cover rounded-lg'
                src='https://btnmt.1cdn.vn/2023/06/13/cdnmedia.baotintuc.vn-upload-oos7t2ppeydfx8lb8ayig-files-_nuoc-mat.jpg' alt=''/>
                <span className='text-base sm:text-lg md:text-xl font-medium text-[var(--primary-text-color)] hover:text-blue-600'>Khai thác nước mặt không phép, phớt lờ quyết định xử phạt</span>
                <span className='text-sm sm:text-base font-normal text-[var(--sub-text-color)]'>By: Admin</span>
              </div>

              <div className='w-1/2 sm:w-1/4 md:w-1/3 flex flex-col px-2'>
                <img
                className='w-full h-fit object-cover rounded-lg'
                src='https://btnmt.1cdn.vn/2023/06/14/medium_2023-06-13-2c24ef578c.jpg' alt=''/>
                <span className='text-base sm:text-lg md:text-xl font-medium text-[var(--primary-text-color)] hover:text-blue-600'>Ngăn chặn thiệt hại do thời tiết khắc nghiệt: Chuyển từ ứng phó sang chủ động chuẩn bị</span>
                <span className='text-sm sm:text-base font-normal text-[var(--sub-text-color)]'>By: Admin</span>
              </div>

              <div className='w-1/2 sm:w-1/4 md:w-1/3 flex flex-col px-2'>
                <img
                className='w-full h-fit object-cover rounded-lg'
                src='https://btnmt.1cdn.vn/2023/06/14/z4426705993385_1f0be519e59ea1cc984b60d56b694dfa.jpg' alt=''/>
                <span className='text-base sm:text-lg md:text-xl font-medium text-[var(--primary-text-color)] hover:text-blue-600'>Điểm sáng trong công tác bảo tồn động vật hoang dã ở Thừa Thiên Huế - Bài 2: Cần nâng cao ý thức, trách nhiệm cộng đồng</span>
                <span className='text-sm sm:text-base font-normal text-[var(--sub-text-color)]'>By: Admin</span>
              </div>

              <div className='w-1/2 sm:w-1/4 md:w-1/3 flex flex-col px-2'>
                <img
                className='w-full h-fit object-cover rounded-lg'
                src='https://btnmt.1cdn.vn/2023/06/14/khong_de_nguoi_dan_thieu_nuoc_sinh_hoat_10034023062021.jpg' alt=''/>
                <span className='text-base sm:text-lg md:text-xl font-medium text-[var(--primary-text-color)] hover:text-blue-600'>Thái Bình yêu cầu đảm bảo cung cấp nước sạch sinh hoạt cho nhân dân</span>
                <span className='text-sm sm:text-base font-normal text-[var(--sub-text-color)]'>By: Admin</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col w-full lg:w-1/4 h-fit md:h-auto mt-2 lg:mt-0 lg:ml-5">
           <div className='flex justify-between text-lg font-medium'>
              Xem nhanh
            <div className='text-blue-600 text-base font-normal cursor-pointer'>Xem thêm</div>
           </div>
           <div className='flex flex-col rounded-bl-3xl p-2 border-l-[1px] border-b-[1px] border-dotted border-[var(--primary-color)]'>
            {xemthem.map((a,i)=>(
              <div key={i} className='relative mb-4 h-[60px] flex justify-between '>
                <span className='h-fit w-4/6 lg:w-3/5 hover:text-blue-600 text-base font-medium leading-5 line-clamp-3 mr-2'>{a.title}</span>
                <img
                className='h-full w-2/6 lg:w-2/5 object-cover rounded-lg'
                src={a.url} alt=''/>
                <div className='absolute w-2 h-2 rounded-full bg-[var(--primary-color)] top-1 -left-2 -translate-x-1/2'></div>
              </div>
            ))}
           </div>
          </div>
        </div>

         {
          ForumLoading?
          <div className='w-full mb-2 bg-[var(--sub-bg-color)] shadow-lg'>

          </div>
          :<div className='w-full mb-2 bg-[var(--sub-bg-color)] shadow-lg'>
            <span className='px-2 pb-4 text-xl font-medium text-[var(--primary-text-color)]'>Bài viết Nổi bật trong diễn đàn.</span>
            {
              toppost.map((post, index)=>(
                <Link to={`/post/${post.idpost}`} key={index} className='w-full h-fit min-h-[150px] flex p-2'>
                  <img
                  className='w-2/5 md:w-1/4 h-fit object-cover rounded-lg'
                  src={post.postthumb} alt=''/>
                  <div className='flex w-3/5 md:w-3/4 flex-col pl-2 lg:pl-6 overflow-hidden'>
                    <span className='text-xl font-medium leading-5 line-clamp-3 text-[var(--primary-text-color)] hover:text-blue-600'>{post.posttitle}</span>
                    <span className='text-base font-normal text-[var(--sub-text-color)]'>By: {post.username}</span>
                    <div className='text-base font-normal leading-5 line-clamp-3 text-[var(--primary-text-color)]'>{post.postdesc.replace(/<[^>]+>/g, '')} asd  asd asd asd asd asd asdas asdas asdasda asdads as</div>
                  </div>
              </Link>
              ))
            }
          </div>
         }   

      </div>
    </div>
  )
}

export default Home