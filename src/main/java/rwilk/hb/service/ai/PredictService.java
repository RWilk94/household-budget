package rwilk.hb.service.ai;

public interface PredictService {

  Double predictValue(String username, Long categoryId) throws Exception;

}
